from django.contrib import admin

# Register your models here.

from medicament.models import Medicament
from medicament.models import Categorie
from medicament.models import SousCategorie
from medicament.models import Liste
from medicament.models import Dci

admin.site.register(Medicament)
admin.site.register(Categorie)
admin.site.register(SousCategorie)
admin.site.register(Dci)
admin.site.register(Liste)

