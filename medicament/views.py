from django.shortcuts import redirect, render
from .models import Medicament

# Create your views here.

def index(request):
    medicaments = Medicament.objects.all()
    return render(request, 'medicament/index_medicament.html',{
		'medicaments': medicaments,
	} )


def detail_medicament(request, medicament_id):
    medicament = Medicament.objects.get(pk=medicament_id)
    return render(request, 'medicament/detail_medicament.html', {
		'medicament': medicament,
	})
  
	
