from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import UserProfile, FriendRequest
from apps.chat.models import Chat
from .serializers import UserProfileSerializer, UserPublicProfileSerializer, ProfileSerializer, PublicProfileSerializer
from apps.user.models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser

from django.core.files.storage import default_storage
from django.core import serializers

import requests
import json


def activate_account(request, key, token):
    print("Valor de key:", key)
    print("Valor de token:", token)

    url = "http://localhost:8000/auth/users/activation/"

    payload = json.dumps({
        "uid": key,
        "token": token
    })
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

    return render(request, 'activate/page.html')


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
    def get(self, request):
        user = self.request.user

        try:
            user_profile = user.user_perfil

            serializer = ProfileSerializer(user_profile)
            return Response(
                serializer.data,
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
            user_profile_object = UserProfile.objects.get(id=pk)

            user_profile = PublicProfileSerializer(user_profile_object)

            user_profile_data = user_profile.data

            user_profile_data['name'] = user_profile_object.user.name

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


class SendFriendRequest(APIView):

    def post(self, request):
        # Perfil del usuario que envía la solicitud
        from_user = request.user.user_perfil
        # ID del usuario al que se envía la solicitud
        to_user_id = request.data.get('to_user')

        try:
            to_user_profile = UserProfile.objects.get(
                id=to_user_id)  # Perfil del usuario destinatario

            # Verificar si ya existe una solicitud pendiente o aceptada entre los usuarios
            existing_request = FriendRequest.objects.filter(
                from_user=from_user, to_user=to_user_profile
            ).exclude(status=FriendRequest.REJECTED).first()

            if existing_request:
                return Response(
                    {'error': 'Friend request already exists or has been accepted'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Crear la solicitud de amistad
            friend_request = FriendRequest.objects.create(
                from_user=from_user,
                to_user=to_user_profile,
                status=FriendRequest.PENDING
            )

            return Response(
                {'message': 'Friend request sent'},
                status=status.HTTP_201_CREATED
            )
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': 'Something went wrong when sending friend request'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class FriendRequestsList(APIView):

    def get(self, request):
        user_profile = self.request.user.user_perfil  # Perfil del usuario autenticado
        try:
            friend_requests_received = FriendRequest.objects.filter(
                to_user=user_profile, status=FriendRequest.PENDING
            )

            serializer_data = []
            for request_obj in friend_requests_received:
                serializer_data.append({
                    'id_request': request_obj.id,
                    'from_user': request_obj.from_user.user.email,
                    'status': request_obj.status,
                    'created_at': request_obj.created_at
                })

            return Response(
                serializer_data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': 'Something went wrong when fetching friend requests'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        friend_request_id = request.data.get('friend_request_id')
        action = request.data.get('action')  # 'accept' o 'reject'

        try:
            friend_request = FriendRequest.objects.get(id=friend_request_id)

            if friend_request.to_user.user != self.request.user:
                return Response(
                    {'error': 'Unauthorized'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            if action == 'accept':
                friend_request.status = FriendRequest.ACCEPTED
                friend_request.save()

                try:
                    # Agregar mutuamente a los usuarios como amigos
                    from_user_profile = friend_request.from_user
                    to_user_profile = friend_request.to_user
                    from_user_profile.friends.add(to_user_profile)
                    to_user_profile.friends.add(from_user_profile)
                except:
                    return Response(
                        {'error': 'No se logro agregarse como amigos'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                try:
                    participant_ids = [
                        from_user_profile.user.id, to_user_profile.user.id]
                    unique_code = Chat.generate_unique_code(participant_ids)
                    chat_instance = Chat.objects.create(
                        unique_code=unique_code)
                    chat_instance.participants.set(
                        [from_user_profile.user, to_user_profile.user])
                except:
                    return Response(
                        {'error': 'Error al crear el Chat'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                return Response(
                    {'message': 'Friend request accepted'},
                    status=status.HTTP_200_OK
                )
            elif action == 'reject':
                friend_request.status = FriendRequest.REJECTED
                friend_request.save()
                return Response(
                    {'message': 'Friend request rejected'},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Invalid action'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except FriendRequest.DoesNotExist:
            return Response(
                {'error': 'Friend request not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': 'Something went wrong when processing friend request'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserSearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        query = request.query_params.get('query', '').strip()

        if query:
            users = CustomUser.objects.filter(name__icontains=query)
            user_data = [{'id': user.id, 'name': user.name} for user in users]
            return Response(user_data, status=200)
        else:
            return Response([], status=200)  # No query, return an empty list