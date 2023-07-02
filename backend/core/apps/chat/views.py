from django.shortcuts import render
from .models import Message

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import MessageSerializer

class ListMessages(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        user = self.request.user
        room_name=request.data["roomName"]

        try:
            messages = Message.objects.filter(room=room_name)[0:25]
            user_profile = MessageSerializer(messages)

            return Response(
                user_profile.data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListContacts(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        user = self.request.user

        #try: