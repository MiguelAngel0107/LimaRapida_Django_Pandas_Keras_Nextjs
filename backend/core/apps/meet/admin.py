from django.contrib import admin
from .models import ImagenCollection


class ImagenCollectionAdmin(admin.ModelAdmin):
    # Campos que se mostrarán en la lista de objetos
    list_display = ['id', 'nombre']
    # Campos por los que se puede buscar en el panel de administración
    search_fields = ['id']


admin.site.register(ImagenCollection, ImagenCollectionAdmin)
