from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# helpers
from apps.perfil.views import activate_account

urlpatterns = [
    path('activate/<str:key>/<str:token>/', activate_account),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('meet/', include('apps.meet.urls')),
    path('functions/', include('apps.functions.urls')),
    path("admin/", admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
