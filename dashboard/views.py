import datetime
from pprint import pprint
from django.shortcuts import render
from approvision.models import Fournisseur
from medicament.models import Categorie,SousCategorie, Dci,Medicament
from caise.models import Patient, Commande, Detail_Ord
from django.http import JsonResponse
import json
from django.db.models import F

def home(request):
    medicaments = Medicament.objects.all()

    nbr_med = Medicament.objects.count()
    nbr_four = Fournisseur.objects.count()
    nbr_client = Patient.objects.count()
    nbr_cmd = Commande.objects.count()

    return render(request, 'dashboard/home.html',{
		'medicaments': medicaments,
    'nbr_med': nbr_med,
    'nbr_client': nbr_client,
    'nbr_four': nbr_four,
    'nbr_cmd' : nbr_cmd,
	})

def expireMed(request):
    exp_meds = Medicament.objects.filter(date_peremption__lte=datetime.datetime.now ) 

    return render(request, 'dashboard/home.html',{
		'exp_meds':exp_meds
	})