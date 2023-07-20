from django.contrib import admin
from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id','picture', 'banner', 'verified',
                    'coins')
    list_display_links = (
        'id',
        'picture',
        'banner'
    )


admin.site.register(UserProfile, UserProfileAdmin)