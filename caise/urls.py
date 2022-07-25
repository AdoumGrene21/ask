from django import views
from django.contrib import admin
from django.urls import path, include
from . import views


from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
  
    path('', views.index_caise, name='caise'),

    path('get-search-med-json', csrf_exempt(views.get_json_search_data), name='search-med-json'),
    path('get-med-detail-json/<str:med>/', views.get_json_med_detail_data, name='med-detail-json'),


   # path('cat-json/', views.get_json_cat_data, name='cat-json'),
   # path('sous-cat-json/<str:cat>/', views.get_json_souscat_data, name='sous-cat-json'),
   # path('sous-dci-json/<str:souscat>/', views.get_json_dci_data, name='sous-dci-json'),
  #  path('sous-med-json/<str:med>/', views.get_json_med_data, name='sous-med-json'),
  #  path('get-med-detail-json/<str:med>/', views.get_json_med_detail_data, name='med-detail-json'),

    #get-search-med-json

    path('facture-json', csrf_exempt(views.get_json_facture), name='chaine-json'),

    
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
