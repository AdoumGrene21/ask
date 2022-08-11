from ast import If
import imp
from django.db.models import Q
from django.shortcuts import render
from medicament.models import Categorie,SousCategorie, Dci,Medicament, Approvisionnement
from approvision.models import Fournisseur

from django.http import JsonResponse
import json

# Create your views here.
def index(request):
    medicaments = Medicament.objects.all()
    fournisseurs = Fournisseur.objects.all()

    
    return render(request, 'approvision/index_approvision.html', {'medicaments':medicaments, 'fournisseurs':fournisseurs})


def get_json_search_data(request,*args, **kwargs):
    if(request.method == 'POST'):
        search_str = json.loads(request.body).get('search_med')
        obj_med = Medicament.objects.filter(
            pk__icontains=search_str) | Medicament.objects.filter(
            nom_commercial__icontains=search_str)| Medicament.objects.filter(
            nom_commercial__istartswith=search_str) 
        data = obj_med.values()

   # med_selected = kwargs.get('search_med')
    return JsonResponse(list(data), safe=False)
   

    #Author.objects.filter(name__unaccent__lower__trigram_similar='Hélène')

def get_json_med_detail_data(request,*args, **kwargs):
    med_selected = kwargs.get('med')

    obj_med = list( Medicament.objects.filter(id=med_selected).values())
    return JsonResponse({'data':obj_med})


def approMedicament(request):

    idProduit = request.POST['idproduit']

    datePeremption =request.POST['dateperemption']
    prixUnitaire = request.POST['prixunitaire']
    quantiteTotal = request.POST['qte'] 

    quantiteApp = request.POST['qteapprovisionner']
    idFournisseur = request.POST['fournisseur']
    obj_four = Fournisseur.objects.get(id=idFournisseur)



    obj_med = Medicament.objects.get(id=idProduit)
    new_app = Approvisionnement(prix = prixUnitaire, quantite = quantiteApp, date_peremption = datePeremption, medicament = obj_med, fournisseur = obj_four )

    obj_med.date_peremption = datePeremption
    obj_med.prix_unitaire = prixUnitaire
    obj_med.quantite = quantiteTotal

    obj_med.save()
    new_app.save()

    success = "super!"

    return JsonResponse({'data':success})
