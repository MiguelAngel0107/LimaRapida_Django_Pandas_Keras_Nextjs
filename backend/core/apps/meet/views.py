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

import cv2
import matplotlib.pyplot as plt
import numpy as np


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


class AprendiendoOpenCvExample1(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image = cv2.imread(imagen_file)

        if image is not None:
            # Muestra la imagen en una ventana
            cv2.imshow('Imagen', image)

            try:
                # Espera hasta que se presione una tecla y luego cierra la ventana
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)


class AprendiendoOpenCvExample2(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image_bgr = cv2.imread(imagen_file)

        if image_bgr is not None:
            # Convierte la imagen a formato RGB
            image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

            # Convierte la imagen a escala de grises (Grayscale)
            image_gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)

            # Convierte la imagen a formato HSV
            image_hsv = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2HSV)

            try:
                # Visualiza la imagen original en formato RGB
                plt.subplot(2, 2, 1)
                plt.imshow(image_rgb)
                plt.title("Imagen RGB")

                # Visualiza el canal de color rojo (Red) por separado
                plt.subplot(2, 2, 2)
                plt.imshow(image_rgb[:, :, 0], cmap='gray')
                plt.title("Canal Rojo (Red)")

                # Visualiza el canal de color verde (Green) por separado
                plt.subplot(2, 2, 3)
                plt.imshow(image_rgb[:, :, 1], cmap='gray')
                plt.title("Canal Verde (Green)")

                # Visualiza el canal de color azul (Blue) por separado
                plt.subplot(2, 2, 4)
                plt.imshow(image_rgb[:, :, 2], cmap='gray')
                plt.title("Canal Azul (Blue)")

                plt.tight_layout()
                plt.show()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)


class AprendiendoOpenCvExample3(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image_bgr = cv2.imread(imagen_file)

        if image_bgr is not None:
            try:
                # Ajustar el brillo de la imagen multiplicando por un factor
                adjusted_bright = self.adjust_brightness(image_bgr, alpha=1.5)

                # Ajustar el contraste de la imagen sumando un valor
                adjusted_contrast = self.adjust_contrast(image_bgr, beta=50)

                # Concatenar las imágenes para visualizar antes y después
                adjusted_images = np.hstack(
                    (image_bgr, adjusted_bright, adjusted_contrast))

                # Mostrar las imágenes antes y después del ajuste
                cv2.imshow(
                    'Imagen original - Ajuste brillo - Ajuste contraste', adjusted_images)

                # Esperar hasta que se presione una tecla y luego cierra la ventana
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)

    def adjust_brightness(self, image, alpha):
        # Realiza la operación de multiplicación para ajustar el brillo
        adjusted_image = np.clip(alpha * image, 0, 255).astype(np.uint8)
        return adjusted_image

    def adjust_contrast(self, image, beta):
        # Realiza la operación de suma para ajustar el contraste
        adjusted_image = np.clip(image + beta, 0, 255).astype(np.uint8)
        return adjusted_image


class AprendiendoOpenCvExample4(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image = cv2.imread(imagen_file)

        if image is not None:
            # Convierte la imagen a escala de grises (Grayscale)
            image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            try:
                # Aplica diferentes técnicas de umbralización
                _, binary_thresh = cv2.threshold(
                    image_gray, 127, 255, cv2.THRESH_BINARY)
                _, binary_inv = cv2.threshold(
                    image_gray, 127, 255, cv2.THRESH_BINARY_INV)
                _, trunc_thresh = cv2.threshold(
                    image_gray, 127, 255, cv2.THRESH_TRUNC)
                _, tozero_thresh = cv2.threshold(
                    image_gray, 127, 255, cv2.THRESH_TOZERO)
                _, tozero_inv = cv2.threshold(
                    image_gray, 127, 255, cv2.THRESH_TOZERO_INV)

                # Concatenar las imágenes umbralizadas para visualizarlas juntas
                thresholded_images = np.hstack(
                    (image_gray, binary_thresh, binary_inv, trunc_thresh, tozero_thresh, tozero_inv))

                # Mostrar las imágenes umbralizadas
                cv2.imshow(
                    'Imagen original - Binary - Binary Inv - Trunc - To Zero - To Zero Inv', thresholded_images)

                # Esperar hasta que se presione una tecla y luego cierra la ventana
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)


class AprendiendoOpenCvExample5(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image = cv2.imread(imagen_file)

        if image is not None:
            # Convierte la imagen a escala de grises (Grayscale)
            image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            try:
                # Aplica el operador de detección de bordes Canny
                edges_canny = cv2.Canny(
                    image_gray, threshold1=100, threshold2=200)

                # Aplica el operador de detección de bordes Sobel
                sobel_x = cv2.Sobel(image_gray, cv2.CV_64F, 1, 0, ksize=3)
                sobel_y = cv2.Sobel(image_gray, cv2.CV_64F, 0, 1, ksize=3)
                edges_sobel = np.sqrt(
                    sobel_x ** 2 + sobel_y ** 2).astype(np.uint8)

                # Concatenar las imágenes para visualizar antes y después de la detección de bordes
                edge_images = np.hstack((image_gray, edges_canny, edges_sobel))

                # Mostrar las imágenes antes y después de la detección de bordes
                cv2.imshow(
                    'Imagen original - Detección de bordes Canny - Detección de bordes Sobel', edge_images)

                # Esperar hasta que se presione una tecla y luego cierra la ventana
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)


class AprendiendoOpenCvExample6(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image = cv2.imread(imagen_file)

        if image is not None:
            # Aplica el filtro de desenfoque (blur)
            blurred = cv2.blur(image, (5, 5))

            # Aplica el filtro Gaussiano
            gaussian = cv2.GaussianBlur(image, (5, 5), 0)

            # Aplica el filtro de mediana
            median = cv2.medianBlur(image, 5)

            # Aplica el filtro bilateral
            bilateral = cv2.bilateralFilter(image, 9, 75, 75)

            try:
                # Concatenar las imágenes para visualizar antes y después de aplicar los filtros
                filtered_images = np.hstack(
                    (image, blurred, gaussian, median, bilateral))

                # Mostrar las imágenes antes y después de aplicar los filtros
                cv2.imshow(
                    'Imagen original - Filtro blur - Filtro Gaussiano - Filtro de mediana - Filtro bilateral', filtered_images)

                # Esperar hasta que se presione una tecla y luego cierra la ventana
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)


class AprendiendoOpenCvExample7(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        # imagen_file = request.FILES.get('imagen')
        imagen_file = r"D:\2023 Proyectos Mas avanzados\LimaRapida\backend\core\apps\meet\views\images\descarga.png"
        image = cv2.imread(imagen_file)

        if image is not None:
            # Aplica la rotación a la imagen
            rotated_image = self.rotate_image(image, angle=45)

            # Aplica el escalado a la imagen
            scaled_image = self.scale_image(image, scale_factor=1.5)

            # Aplica la traslación a la imagen
            translated_image = self.translate_image(image, tx=50, ty=50)

            try:
                # Aplica la perspectiva a la imagen
                perspective_image = self.perspective_transform(image)

                # Concatenar las imágenes para visualizar antes y después de aplicar las transformaciones
                transformed_images = np.hstack((image, rotated_image, scaled_image, translated_image, perspective_image))

                # Mostrar las imágenes antes y después de aplicar las transformaciones
                cv2.imshow('Imagen original - Rotación - Escalado - Traslación - Perspectiva', transformed_images)

                # Esperar hasta que se presione una tecla y luego cierra la ventana
                cv2.waitKey(0)
                cv2.destroyAllWindows()

                return Response({'mensaje': 'Imagen guardada correctamente.'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Nada Salio Bien No se Guardo")
        return Response({'error': 'No se recibió una imagen válida.'}, status=status.HTTP_400_BAD_REQUEST)

    def rotate_image(self, image, angle):
        rows, cols = image.shape[:2]
        center = (cols // 2, rows // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated_image = cv2.warpAffine(image, M, (cols, rows))
        return rotated_image

    def scale_image(self, image, scale_factor):
        scaled_image = cv2.resize(
            image, None, fx=scale_factor, fy=scale_factor)
        return scaled_image

    def translate_image(self, image, tx, ty):
        M = np.float32([[1, 0, tx], [0, 1, ty]])
        translated_image = cv2.warpAffine(
            image, M, (image.shape[1], image.shape[0]))
        return translated_image

    def perspective_transform(self, image):
        rows, cols = image.shape[:2]
        pts1 = np.float32(
            [[0, 0], [cols - 1, 0], [0, rows - 1], [cols - 1, rows - 1]])
        pts2 = np.float32(
            [[0, 0], [cols - 1, 0], [int(cols * 0.33), rows - 1], [int(cols * 0.66), rows - 1]])
        M = cv2.getPerspectiveTransform(pts1, pts2)
        perspective_image = cv2.warpPerspective(image, M, (cols, rows))
        return perspective_image
