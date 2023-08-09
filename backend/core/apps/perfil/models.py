from django.db import models
from django.conf import settings
from .countries import Countries
import os
from django.contrib.auth import get_user_model
User = get_user_model()

VERIFICATION_OPTIONS = (
    ('unverified', 'unverified'),
    ('verified', 'verified'),
)


def user_directory_path_profile(instance, filename):
    profile_picture_name = 'users/perfiles/{0}/picture.jpg'.format(instance.id)
    full_path = os.path.join(settings.MEDIA_ROOT, profile_picture_name)
    if os.path.exists(full_path):
        os.remove(full_path)
    return profile_picture_name


def user_directory_path_banner(instance, filename):
    profile_picture_name = 'users/portadas/{0}/banner.jpg'.format(instance.id)
    full_path = os.path.join(settings.MEDIA_ROOT, profile_picture_name)
    if os.path.exists(full_path):
        os.remove(full_path)
    return profile_picture_name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_perfil')

    # Info for Social
    picture = models.ImageField(
        default='users/user_default_profile.jpg', upload_to=user_directory_path_profile)
    banner = models.ImageField(
        default='users/user_default_bg.jpg', upload_to=user_directory_path_banner)
    verified = models.CharField(
        max_length=10, choices=VERIFICATION_OPTIONS, default='unverified')
    coins = models.DecimalField(
        max_digits=19, decimal_places=2, default=0, blank=False)
    date_created = models.DateField(auto_now_add=True)

    # Data for Ecommerce
    city = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=255, default='')
    country_region = models.CharField(
        max_length=255, choices=Countries.choices, default=Countries.Peru)

    # User info
    location = models.CharField(max_length=50, null=True, blank=True)
    url = models.CharField(max_length=80, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    bio = models.TextField(max_length=150, null=True, blank=True)

    # Friends
    friends = models.ManyToManyField('self', blank=True, related_name='user_friends')

    def __str__(self):
       return self.user.email


class FriendRequest(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

    REQUEST_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]

    from_user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name='friend_requests_sent')
    to_user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name='friend_requests_received')
    status = models.CharField(
        max_length=10, choices=REQUEST_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
