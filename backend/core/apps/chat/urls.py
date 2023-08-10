from django.urls import path
from . import views

urlpatterns = [
    path("chats/", views.UserChats.as_view()),
    path('<str:id>/messages/', views.ChatMessages.as_view()),
]
