from django.urls import path, re_path

from .consumers import VideoCallConsumer

websocket_urlpatterns = [
    path('ws/video/<str:room_name>/', VideoCallConsumer.as_asgi()),
]
