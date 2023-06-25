from django.contrib.gis.db import models
from apps.carreteras.models import Carretera


class FlujoVehicular(models.Model):
    carretera = models.ForeignKey(Carretera, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    cantidad_vehiculos = models.IntegerField()

    def __str__(self):
        return f"Flujo en {self.carretera.nombre} - {self.fecha}"


class Congestion(models.Model):
    carretera = models.ForeignKey(Carretera, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    punto_congestion = models.PointField()

    def __str__(self):
        return f"Congestión en {self.carretera.nombre} - {self.fecha}"
