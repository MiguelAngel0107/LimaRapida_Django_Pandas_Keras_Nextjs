from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model 
User = get_user_model()

class Message(models.Model):
  username = models.ForeignKey(User, on_delete=models.CASCADE)
  room = models.CharField(max_length=255)
  content = models.TextField()
  date_added = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('date_added',)