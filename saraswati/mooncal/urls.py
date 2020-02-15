from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('today', views.today, name='today'),
    path('<int:year>/<int:month>/<int:day>', views.day, name='day'),
    path('<int:year>/<int:month>/', views.month, name='month'),

    path('api/today', views.today_json, name='today_json'),
    path('api/<int:year>/<int:month>/<int:day>', views.day_json, name='day_json'),
    path('api/<int:year>/<int:month>', views.month_json, name='month_json'),
    path('api/hurals', views.rituals_json, name='hurals_json'),
    path('api/rituals', views.rituals_json, name='rituals_json'),
    path('api/ritual/<int:id>', views.ritual_json, name='ritual_json')
]
