from django.contrib import admin
from .models import UserProfile, FriendRequest


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'picture', 'banner', 'verified',
                    'coins')
    list_display_links = (
        'id',
        'picture',
        'banner'
    )


class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('from_user',
                    'to_user',
                    'status',
                    'created_at')
    list_display_links = (
        'from_user',
        'to_user',
        'status',
        'created_at'
    )


admin.site.register(FriendRequest, FriendRequestAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
