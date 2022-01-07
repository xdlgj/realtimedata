from django.core.management.base import BaseCommand
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from temperature.models import Temp
from temperature.serializers import TempSerializer


class Command(BaseCommand):
    # python manage.py add_temp -h 可以查看帮助文档
    help = '添加温度数据'

    def add_arguments(self, parser):
        parser.add_argument('temp')

    def handle(self, *args, **options):
        temp = Temp.objects.create(value=options['temp'])
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'test',
            {
                "type": "send.data",
                "data": TempSerializer(instance=[temp], many=True).data,
            }
        )