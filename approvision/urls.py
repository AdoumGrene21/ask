from django import views
from django.contrib import admin
from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
  
    path('', views.index, name='index-approvision'),

    path('get-search-med-json', csrf_exempt(views.get_json_search_data), name='search-med-json'),
    path('get-med-detail-json/<str:med>/', views.get_json_med_detail_data, name='med-detail-json'),

    path('approvision-medicament', csrf_exempt(views.approMedicament), name='approvision-med'), 

]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
