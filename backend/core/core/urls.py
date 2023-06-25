from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('functions/', include('apps.functions.urls')),
    path("admin/", admin.site.urls),
]
