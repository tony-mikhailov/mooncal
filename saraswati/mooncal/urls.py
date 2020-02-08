from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('today', views.today, name='today'),
    path('today/json', views.today_json, name='today_json'),
    path('<int:year>/<int:month>/<int:day>', views.day, name='day'),
    path('<int:year>/<int:month>/<int:day>/json', views.day_json, name='day_json'),
    path('<int:year>/<int:month>/', views.month, name='month'),
    path('<int:year>/<int:month>/json', views.month_json, name='month_json')
]
