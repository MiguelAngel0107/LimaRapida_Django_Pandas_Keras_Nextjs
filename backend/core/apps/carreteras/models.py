from django.contrib.gis.db import models
from apps.geografia.models import Ciudad


class TipoCarretera(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Carretera(models.Model):
    nombre = models.CharField(max_length=100)
    longitud = models.FloatField()
    tipo_carretera = models.ForeignKey(TipoCarretera, on_delete=models.CASCADE)
    geometria = models.LineStringField()
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
