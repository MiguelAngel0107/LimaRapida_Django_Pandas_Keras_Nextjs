from django.db import models
from django.conf import settings
from .countries import Countries
import os

VERIFICATION_OPTIONS=(
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
    # Info for Social
    picture = models.ImageField(default='users/user_default_profile.jpg', upload_to=user_directory_path_profile)
    banner = models.ImageField(default='users/user_default_bg.jpg', upload_to=user_directory_path_banner)
    verified = models.CharField(max_length=10, choices=VERIFICATION_OPTIONS, default='unverified')
    coins = models.DecimalField(max_digits=19, decimal_places=2, default=0, blank=False)
    date_created = models.DateField(auto_now_add=True)

    # Data for Ecommerce
    address_line_1 = models.CharField(max_length=255, default='')
    address_line_2 = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    state_province_region = models.CharField(max_length=255, default='')
    zipcode = models.CharField(max_length=20, default='')
    phone = models.CharField(max_length=255, default='')
    country_region = models.CharField(
        max_length=255, choices=Countries.choices, default=Countries.Peru)
    
    #User info
    location = models.CharField(max_length=50, null=True, blank=True)
    url = models.CharField(max_length=80, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    bio = models.TextField(max_length=150, null=True, blank=True)

    #def __str__(self):
    #    return self.user.email
