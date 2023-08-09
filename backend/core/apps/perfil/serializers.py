from rest_framework import serializers
from .models import UserProfile
from apps.user.models import CustomUser


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = CustomUser
        fields = '__all__'


class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'id',
            'picture',
            'banner',
            'verified',
            'url',
            'birthday',
            'bio',
            'user']


class UserPublicProfileSerializer(serializers.ModelSerializer):
    profile = PublicProfileSerializer()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'profile']
