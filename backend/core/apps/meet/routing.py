from django.urls import path, re_path

from .consumers import VideoCallConsumerChat, VideoCallConsumer

websocket_urlpatterns = [
    path('ws/video/<str:room_name>/', VideoCallConsumerChat.as_asgi()),

    path('ws/video-test/<str:room_name>/', VideoCallConsumer.as_asgi()),
]
