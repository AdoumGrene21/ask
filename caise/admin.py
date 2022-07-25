from django.contrib import admin

# Register your models here.

from .models import Detail_Ord, Patient,Commande


admin.site.register(Commande)
admin.site.register(Detail_Ord)
admin.site.register(Patient)
