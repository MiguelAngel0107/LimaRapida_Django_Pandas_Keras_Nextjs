from django.urls import path
from . import views

urlpatterns = [
    path('capturas-images/', views.GuardarImagenAPIView.as_view()),
    # path('example-1/', views.AprendiendoOpenCvExample1.as_view()),
    # path('example-2/', views.AprendiendoOpenCvExample2.as_view()),
    # path('example-3/', views.AprendiendoOpenCvExample3.as_view()),
    # path('example-4/', views.AprendiendoOpenCvExample4.as_view()),
    # path('example-5/', views.AprendiendoOpenCvExample5.as_view()),
    # path('example-6/', views.AprendiendoOpenCvExample6.as_view()),
    # path('example-7/', views.AprendiendoOpenCvExample7.as_view()),
]
