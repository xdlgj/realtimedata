import json
from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from asgiref.sync import async_to_sync

from temperature.serializers import TempSerializer
from temperature.models import Temp


class TempConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)('test', self.channel_name)
        self.accept()

        self.send(text_data=json.dumps({'data': TempSerializer(instance=Temp.objects.all(), many=True).data}))

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)('test', self.channel_name)
        raise StopConsumer

    def receive(self, text_data=None, bytes_data=None):
        print(text_data, bytes_data)
        async_to_sync(self.channel_layer.group_send)(
            'test',
            {
                "type": "send.data",
                "data": 123,
            }
        )

    def send_data(self, event):
        data = event['data']
        self.send(text_data=json.dumps({'data': data}))


