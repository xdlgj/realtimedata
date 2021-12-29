from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from temperature.serializers import TempSerializer
from temperature.models import Temp


class ValueGenericViewSet(GenericViewSet):
    queryset = Temp.objects.all()
    serializer_class = TempSerializer

    @action(methods=['GET'], detail=False)
    def common(self, request):
        ser = self.get_serializer(instance=self.get_queryset(), many=True)
        return Response({"data": ser.data})
