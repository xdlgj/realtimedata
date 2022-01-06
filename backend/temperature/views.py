from time import sleep

from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from temperature.serializers import TempSerializer
from temperature.models import Temp


class ValueGenericViewSet(GenericViewSet):
    serializer_class = TempSerializer

    def get_queryset(self):
        start_time = self.request.query_params.get('start_time')
        if start_time:
            return Temp.objects.filter(time__gt=start_time)
        return Temp.objects.all()

    @action(methods=['GET'], detail=False)
    def common(self, request):
        ser = self.get_serializer(instance=self.get_queryset(), many=True)
        return Response({"data": ser.data})

    @action(methods=['GET'], detail=False)
    def poll(self, request):
        ser = self.get_serializer(instance=self.get_queryset(), many=True)
        return Response({"data": ser.data})

    @action(methods=['GET'], detail=False)
    def long_poll(self, request):
        for i in range(20):
            obj = self.get_queryset()
            if obj:
                break
            sleep(1)
        ser = self.get_serializer(instance=obj, many=True)
        return Response({"data": ser.data})
