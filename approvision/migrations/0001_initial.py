# Generated by Django 3.2.8 on 2022-07-27 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fournisseur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('telephone', models.CharField(max_length=250)),
                ('adresse', models.CharField(max_length=250)),
            ],
        ),
    ]
