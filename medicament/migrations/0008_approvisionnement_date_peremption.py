# Generated by Django 3.2.8 on 2022-07-26 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicament', '0007_approvisionnement'),
    ]

    operations = [
        migrations.AddField(
            model_name='approvisionnement',
            name='date_peremption',
            field=models.DateField(null=True),
        ),
    ]