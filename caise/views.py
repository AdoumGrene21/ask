import datetime
from pprint import pprint
from django.shortcuts import render
from medicament.models import Categorie,SousCategorie, Dci,Medicament
from caise.models import Patient, Commande, Detail_Ord
from django.http import HttpResponse, JsonResponse
import json
from django.db.models import F

from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
from django.db.models import Sum
from django.core.paginator import Paginator


# Create your views here.

def index_caise(request):
    medicaments = Medicament.objects.all()

    return render(request, 'caise/index_caise.html',{
		'medicaments':medicaments
	})

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


def get_json_med_detail_data(request,*args, **kwargs):
    med_selected = kwargs.get('med')

    obj_med = list( Medicament.objects.filter(id=med_selected).values())
    return JsonResponse({'data':obj_med})


def get_json_facture(request): 
    # chaine_com = kwargs.get('chaine_com')
    chaineCom = request.POST['chainecom']
    tabChaineCom = chaineCom.split('|')
    
    #dateCom = request.POST['datecom'] 
    totalCom = request.POST['totalcom']
    
    nomClient = request.POST['nomclient']
    ageClient = request.POST['ageclient']
    sexeClient = request.POST['sexeclient']
    try:
        obj_patient = Patient.objects.get(nom = nomClient, age = ageClient, sexe = sexeClient)
        obj_commande = Commande(montant = totalCom, patient = obj_patient)
        obj_commande.save()

    except Patient.DoesNotExist:
        obj_patient = Patient(nom = nomClient, age = ageClient, sexe = sexeClient)
        obj_patient.save()
        obj_commande = Commande(montant = totalCom, patient = obj_patient)
        obj_commande.save()

    for i in range(len(tabChaineCom)):
    #for i in range(0, len(tabChaineCom)):
        #tabChaineCom[i]
        ligne_com = tabChaineCom[i].split(';')
        if(len(ligne_com) > 1):
            obj_medica= Medicament.objects.get(pk=ligne_com[0])
            obj_detail = Detail_Ord( qte = ligne_com[1], commande = obj_commande, medicament = obj_medica )
           
            obj_detail.save()

            obj_medica.quantite = F('quantite') - ligne_com[1]
            obj_medica.save()

            

    return JsonResponse({'data':ligne_com})


def commande_client(request):

    commandes = Commande.objects.all().order_by('-id')
    paginator = Paginator(commandes, 10)
    page_number = request.GET.get('page')
    page_obj = Paginator.get_page(paginator, page_number)
    return render(request, 'caise/commande_client.html',{
		'commandes':commandes,
        'page_obj' : page_obj,
	})

        

def export_facture_pdf(request,commande_id):

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] =  'attachment; filename=Facture' + \
        str(datetime.datetime.now())+'.pdf'
    response['Content-Transfer-Encoding'] = 'binary'

    commande = Commande.objects.get(pk=commande_id)
    detail_com = Detail_Ord.objects.filter(commande=commande_id)

    html_string = render_to_string(
        'caise/facture_pdf_output.html', {'detail_com':detail_com, 'commande':commande, 'total':0})
    html = HTML(string=html_string)

    result = html.write_pdf()

    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())

    return response
    

    
