from django.db import models

# Create your models here.
class Fournisseur(models.Model):
    nom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=250)
    adresse = models.CharField(max_length=250)

    def __str__(self):
        return "%s" % (self.nom)

    