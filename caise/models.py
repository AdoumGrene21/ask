from django.db import models
from django.utils import timezone

from medicament.models import Medicament

# Create your models here.

class Patient(models.Model):
    nom = models.CharField(max_length=100)
    age = models.IntegerField(null=True)
    sexe = models.CharField(max_length=50)

    def __str__(self):
        return self.nom

class Commande(models.Model):
    montant = models.FloatField(null=False)
    date_created = models.DateTimeField(auto_now = True)
    patient = models.ForeignKey(Patient, null=False, blank=True, on_delete=models.CASCADE)
   
    def __str__(self):
        return  "%s - %s - %s" % (self.montant, self.patient, self.date_created)

class Detail_Ord(models.Model):
    qte = models.IntegerField(null=False)
    commande = models.ForeignKey(Commande, null=False, blank=True, on_delete=models.CASCADE)
    medicament = models.ForeignKey(Medicament, null=False, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return  "%s - %s - %s" % (self.medicament, self.qte, self.commande)