from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from .models import ImagenCollection
from core.storage_backeds import MediaStorage
from PIL import Image
import os
import datetime
import io


class GuardarImagenAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        imagen_file = request.FILES.get('imagen')

        if imagen_file:
            # Validar que sea una imagen
            if not imagen_file.content_type.startswith('image/'):
                return Response({'error': 'Invalid file type. Only images are allowed.'}, status=status.HTTP_400_BAD_REQUEST)


            try:
                # Guarda la imagen en S3 usando MediaStorage
                image_path = f'{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.png'
                media_storage = MediaStorage()
                media_storage.save(image_path, imagen_file)

                nombre_archivo = f'https://redes-neuronales.s3.amazonaws.com/media/{image_path}'
                
                # Crear la entrada en la base de datos
                ImagenCollection.objects.create(nombre=nombre_archivo)
                print("Todo Salio Bien Se Guardo")

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)
