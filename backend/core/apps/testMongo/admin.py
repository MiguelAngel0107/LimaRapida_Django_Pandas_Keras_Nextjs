from django.contrib import admin
from .models import Producto


class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tagline')
    list_filter = ('nombre',)


admin.site.register(Producto, ProductoAdmin)
