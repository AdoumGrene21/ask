# Generated by Django 3.2.8 on 2022-07-27 09:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicament', '0009_auto_20220727_0940'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicament',
            name='numero_lot',
        ),
    ]
