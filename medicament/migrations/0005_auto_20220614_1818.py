# Generated by Django 3.2.8 on 2022-06-14 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicament', '0004_auto_20220611_1337'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicament',
            name='date_created',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='medicament',
            name='date_peremption',
            field=models.DateField(),
        ),
    ]