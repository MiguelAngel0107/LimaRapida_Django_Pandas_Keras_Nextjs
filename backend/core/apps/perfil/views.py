from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


# from .models import UserProfile
from .serializers import UserProfileSerializer, UserPublicProfileSerializer
from apps.user.models import UserAccount
from rest_framework.parsers import MultiPartParser, FormParser

from django.core.files.storage import default_storage
from django.core import serializers
import json


class UserProfileUpdate(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, format=None):

        try:
            user = self.request.user
            data = self.request.data

            name = data.get('fullName')
            biografia = data.get('biografia')
            birthday = data.get('birthday')
            location = data.get('location')
            url = data.get('url')
        except:
            return Response(
                {'error': 'Falta archivos'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            user_profile = user.profile
            try:

                if name != "":
                    user.name = name
                    user.save()

                if biografia != "":
                    user_profile.bio = biografia

                if birthday != "":
                    user_profile.birthday = birthday

                if location != "":
                    user_profile.location = location

                if url != "":
                    user_profile.url = url

                try:
                    # Actualizar imagen de perfil
                    picture_file = request.FILES.get('picture')
                    if picture_file:
                        if user_profile.picture:
                            default_storage.delete(user_profile.picture.path)

                        user_profile.picture = picture_file

                    # Actualizar imagen de portada
                    banner_file = request.FILES.get('banner')
                    if banner_file:
                        if user_profile.banner:
                            default_storage.delete(user_profile.banner.path)

                        user_profile.banner = banner_file

                    user_profile.save()
                except:
                    return Response(
                        {'error': 'Esta mal las Imagens Error'},
                        status=status.HTTP_402_PAYMENT_REQUIRED
                    )

            except:
                return Response(
                    {'error': 'Something went wrong when updating profile'},
                    status=status.HTTP_507_INSUFFICIENT_STORAGE
                )

            user_profile_serializer = UserProfileSerializer(user)
            user_profile_data = user_profile_serializer.data

            return Response(
                user_profile_data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserProfileUpdateEcommerce(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def put(self, request, format=None):

        try:
            user = self.request.user
            data = self.request.data

            # Obtener instancia de UserProfile correspondiente al usuario
            user_profile = user.profile

            # Actualizar campos de UserProfile
            user_profile.address_line_1 = data['address_line_1']
            user_profile.address_line_2 = data['address_line_2']
            user_profile.city = data['city']
            user_profile.state_province_region = data['state_province_region']
            user_profile.zipcode = data['zipcode']
            user_profile.phone = data['phone']
            user_profile.country_region = data['country_region']

            user_profile.save()

            # Serializar la información actualizada
            user_profile_serializer = UserProfileSerializer(user)
            user_profile_data = user_profile_serializer.data

            return Response(
                user_profile_data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserViewData(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        user = self.request.user

        try:
            user_profile = UserProfileSerializer(user)
            user_profile_data = user_profile.data

            products_json = serializers.serialize('json', user.get_products(), fields=(
                'name', 'photo', 'description', 'price', 'compare_price', 'category', 'quantity', 'sold'))
            products = json.loads(products_json)
            user_profile_data['products'] = products

            return Response(
                user_profile_data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PublicProfileUserView(APIView):
    permission_classes = [permissions.AllowAny,]

    def get(self, request, pk):

        try:
            user_profile_object = UserAccount.objects.get(id=pk)
            #print("hasta aqui llegue")
            user_profile = UserPublicProfileSerializer(user_profile_object)

            user_profile_data = user_profile.data
            #print(user_profile_data)

            # Agregar la función get_products a la respuesta
            products_json = serializers.serialize('json', user_profile_object.get_products(), fields=(
                'name', 'photo', 'description', 'price', 'compare_price', 'category', 'quantity', 'sold'))
            products = json.loads(products_json)
            #print(products)
            user_profile_data['products'] = products

            return Response(
                user_profile_data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            print(str(e))
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
