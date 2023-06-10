from django.db import models

# Create your models here.


class Ciudad(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
