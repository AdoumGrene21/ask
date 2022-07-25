import datetime
from pprint import pprint
from django.shortcuts import render
from medicament.models import Categorie,SousCategorie, Dci,Medicament
from caise.models import Patient, Commande, Detail_Ord
from django.http import JsonResponse
import json
from django.db.models import F


def home(request):
    medicaments = Medicament.objects.all()

    return render(request, 'dashboard/home.html',{
		'medicaments':medicaments
	})

def expireMed(request):
    exp_med = Medicament.objects.filter(date__range=[datetime.datetime.now()] ) 

    return render(request, 'dashboard/home.html',{
		'exp_med':exp_med
	})