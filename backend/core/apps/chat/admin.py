from django.contrib import admin
from .models import Chat, Message
@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('unique_code',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'chat', 'content', 'timestamp')
