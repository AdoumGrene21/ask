from django import views
from django.contrib import admin
from django.urls import path, include
from . import views


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  
    path('', views.index, name='medicaments'),
    path('detail/<medicament_id>', views.detail_medicament, name='medicament-detail'),
    path('fichestock/<medicament_id>', views.export_fiche_stock_pdf, name='fiche-stock'),

    
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
