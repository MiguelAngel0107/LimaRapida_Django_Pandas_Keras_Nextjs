from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
import math

# Create your views here.


class LongitudSecanteView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        angulo = float(request.query_params.get('angulo', 0))
        radio = float(request.query_params.get('radio', 0))

        # Convertir el ángulo de grados a radianes
        angulo_radianes = math.radians(angulo)

        # Calcular la longitud de la secante
        longitud_secante = (2 * radio) / math.cos(angulo_radianes)
        longitud_secante = round(longitud_secante, 2)

        print(longitud_secante)

        return Response({'longitud_secante': longitud_secante}, status=status.HTTP_200_OK)
