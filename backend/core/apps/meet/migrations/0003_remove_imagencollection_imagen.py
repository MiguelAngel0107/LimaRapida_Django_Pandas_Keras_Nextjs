# Generated by Django 4.1.9 on 2023-07-20 03:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("meet", "0002_imagencollection_fecha_creacion_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="imagencollection",
            name="imagen",
        ),
    ]