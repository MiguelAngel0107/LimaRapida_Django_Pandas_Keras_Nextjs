from django.urls import path
from . import views

urlpatterns = [
    path('capturas-images/', views.GuardarImagenAPIView.as_view()),
]