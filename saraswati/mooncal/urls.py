from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('today', views.today, name='today'),
    path('today/json', views.today_json, name='today_json'),
    path('<int:year>/<int:month>/<int:day>', views.day, name='day')
]
