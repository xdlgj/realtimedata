from rest_framework import serializers
from temperature.models import Temp


class TempSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temp
        fields = "__all__"
