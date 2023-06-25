from django.contrib.gis.db import models
from apps.carreteras.models import Carretera


class SugerenciaCarretera(models.Model):
    carretera = models.ForeignKey(Carretera, on_delete=models.CASCADE)
    fecha = models.DateField()
    descripcion = models.TextField()

    def __str__(self):
        return f"Sugerencia para {self.carretera.nombre} - {self.fecha}"
