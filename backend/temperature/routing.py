from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/temp/(?P<client_id>\w+)/$', consumers.TempConsumer.as_asgi()),
]