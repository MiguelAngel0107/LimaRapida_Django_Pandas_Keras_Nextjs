from django.contrib import admin
from .models import CustomUser


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'name', 'is_active',
                    'is_staff', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name')


admin.site.register(CustomUser, UserAdmin)