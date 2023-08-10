from django.db import models
import hashlib
from apps.user.models import CustomUser

class Chat(models.Model):
    participants = models.ManyToManyField(CustomUser, related_name='chats')
    unique_code = models.CharField(max_length=64, unique=True)

    @classmethod
    def generate_unique_code(cls, participant_ids):
        participant_ids.sort()  # Ordena los IDs de los participantes para generar un código consistente
        participants_str = '-'.join(str(id) for id in participant_ids)
        hash_object = hashlib.sha256(participants_str.encode())
        unique_code = hash_object.hexdigest()
        return unique_code

class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='messages_sent')
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
