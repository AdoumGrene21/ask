import datetime
from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import Medicament, Approvisionnement
from django.core.paginator import Paginator

from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile

# Create your views here.

def index(request):
    medicaments = Medicament.objects.all()
    paginator = Paginator(medicaments, 10)
    page_number = request.GET.get('page')
    page_obj = Paginator.get_page(paginator, page_number)
    return render(request, 'medicament/index_medicament.html',{
		'medicaments': medicaments,
    'page_obj' : page_obj,
	} )


def detail_medicament(request, medicament_id):
    medicament = Medicament.objects.get(pk=medicament_id)
    return render(request, 'medicament/detail_medicament.html', {
		'medicament': medicament,
	})
  
	

def export_fiche_stock_pdf(request, medicament_id):

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] =  'attachment; filename=FicheStock' + \
        str(datetime.datetime.now())+'.pdf'
    response['Content-Transfer-Encoding'] = 'binary'

    medicament = Medicament.objects.get(pk=medicament_id)
    approvisionnements = Approvisionnement.objects.filter(medicament=medicament)
    #detail_com = Detail_Ord.objects.filter(commande=commande_id)

    

    html_string = render_to_string(
        'medicament/fiche_stock_pdf_output.html', { 'medicament': medicament, 'approvisionnements': approvisionnements })
    html = HTML(string=html_string)

    result = html.write_pdf()

    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())

    return response
    