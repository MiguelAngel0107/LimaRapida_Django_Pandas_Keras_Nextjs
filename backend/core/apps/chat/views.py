from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat, Message
from django.shortcuts import get_object_or_404


class UserChats(APIView):
    def get(self, request):
        user = self.request.user

        # Obtener todos los chats a los que pertenece el usuario
        user_chats = Chat.objects.filter(participants=user)

        chat_data = []
        
        for chat in user_chats:
            participants = chat.participants.all()
            first_participant = None
            for participant in participants:
                if participant != user:  # Saltar al usuario actual
                    first_participant = participant
                    break

            chat_data.append({
                'id_chat': chat.id,
                'nombre_chat': first_participant.name,
                'unique_code': chat.unique_code,
                'participants': [participant.id for participant in chat.participants.all()]
            })

        return Response(chat_data, status=status.HTTP_200_OK)


class ChatMessages(APIView):
    def get(self, request, id):
        user = self.request.user
        chat = get_object_or_404(Chat, pk=id)

        # Obtener los últimos 20 mensajes del chat
        chat_messages = Message.objects.filter(
            chat=chat).order_by('-timestamp')[:20]

        message_data = []
        for message in chat_messages:
            message_data.append({
                'username': message.sender.email,
                'message': message.content,
                'timestamp': message.timestamp
            })

        return Response(message_data, status=status.HTTP_200_OK)
