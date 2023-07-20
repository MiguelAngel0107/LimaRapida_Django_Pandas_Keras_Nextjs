from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from .models import ImagenCollection

import os
import datetime

class GuardarImagenAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        imagen_file = request.FILES.get('imagen')

        if imagen_file:
            # Guardar la imagen en la carpeta de medios
            nombre_archivo = f'{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.png'
            
            ruta_guardado = os.path.join(settings.MEDIA_ROOT, nombre_archivo)
            
            with open(ruta_guardado, 'wb') as f:
                for chunk in imagen_file.chunks():
                    f.write(chunk)

            nombre_archivo = f'https://investigacion-redes-neuronales.onrender.com/media/{nombre_archivo}'

            ImagenCollection.objects.create(nombre=nombre_archivo)
            print("Todo Salio Bien Se Guardo")

            return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)
