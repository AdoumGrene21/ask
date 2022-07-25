from django.db import models
from django.utils import timezone

# Create your models here.
class Liste(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nom


class Categorie(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nom


class SousCategorie(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    # Foreign keys
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom



class Dci(models.Model):
    nom = models.CharField(max_length=100)
    action_therapeutique = models.CharField(max_length=250)
    indications = models.CharField(max_length=50)
    presentation = models.CharField(max_length=250)
    posologie = models.CharField(max_length=250)
    duree = models.CharField(max_length=250)
    precautions = models.TextField(null=True, blank=True)
    remarques = models.TextField(null=True, blank=True)

    # Foreign keys
    
    sous_categorie = models.ForeignKey(SousCategorie, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom


class Medicament(models.Model):
    medicament_code = models.CharField(max_length=100)
    nom_commercial = models.CharField(max_length=250)
    dosage = models.CharField(max_length=50)
    forme = models.CharField(max_length=100)
    quantite = models.IntegerField(max_length=20, null=True, blank=True)
    prix_unitaire = models.DecimalField(max_digits=7, decimal_places=2)
    numero_lot = models.CharField(max_length=250, blank=True)
    date_peremption = models.DateField(auto_now=False, auto_now_add=False)
    nom_fabricant = models.TextField(null=True, blank=True)
    addresse_fabricant = models.TextField(null=True, blank=True)
    # avatar = models.ImageField(upload_to = "employee-avatars/",null=True, blank=True)
    date_added = models.DateTimeField(default = timezone.now)
    date_created = models.DateField(auto_now = True)

    # Foreign keys
    liste = models.ForeignKey(Liste, null=True, blank=True, on_delete=models.CASCADE)
    dci = models.ForeignKey(Dci, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s" % (self.nom_commercial, self.medicament_code)




