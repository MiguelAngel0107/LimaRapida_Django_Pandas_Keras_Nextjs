from djongo import models
#from django.db import models


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    tagline = models.TextField()

    class Meta:
        db_table = 'producto'
        app_label = 'testMongo'

