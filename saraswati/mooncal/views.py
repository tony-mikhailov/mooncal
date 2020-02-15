from builtins import object
from datetime import *

import calendar
import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.template.defaultfilters import first

import mooncal.cal_helpers

from .models import MoonDay, Ritual
from .forms import RitualForm
from .qol import *


def index(request):
    return HttpResponse("Hello, world. You're at the index.")

def today(request):
    day =  MoonDay.today()
    
    morning_form = RitualForm(auto_id=True, initial = {'ritual' : day.morning_hural.pk, 'title' : 'Yarr'} )
    day_form = RitualForm(auto_id=True, initial = {'ritual' : day.day_hural.pk} )
    
    ctx = { 'today': day, 'morning_form' : morning_form, 'day_form' : day_form }
    
    return render(request, 'today.html', context=ctx)

def today_json(request):
    # data = serializers.serialize("json", [MoonDay.today()], indent=2, ensure_ascii=False)
    data = json.dumps(MoonDay.today().json(), indent=2, ensure_ascii=False)
    
    return HttpResponse(data, content_type='application/json; charset=utf-8')
    # ctx = { 'today': MoonDay.today() }
    # return render(request, 'today.html', context=ctx)``~

def date_check(year,month,day):
    try:
        datetime.strptime('%d-%d-%d'%(year,month,day), '%Y-%m-%d')
        return True
    except ValueError:
        return False

def date_conv(year,month,day):
    return datetime.strptime('%d-%d-%d'%(year,month,day), '%Y-%m-%d')


def day(request, year, month, day):
    
    date = date_conv(year,month,day)
    day = MoonDay.objects.get(year=year,day_no=date.timetuple().tm_yday-1)
    
    morning_form = RitualForm(auto_id=True, initial = {'ritual' : day.morning_hural.pk, 'title' : 'Yarr'} )
    day_form = RitualForm(auto_id=True, initial = {'ritual' : day.day_hural.pk} )
    
    ctx = { 'today': day, 'morning_form' : morning_form, 'day_form' : day_form }
    return render(request, 'today.html', context=ctx)


def day_json(request, year, month, day):
    
    date = date_conv(year,month,day)
    qs = MoonDay.objects.filter(year=year,day_no=date.timetuple().tm_yday-1)
    data = serializers.serialize("json", qs, indent=2, ensure_ascii=False)
    
    return HttpResponse(data, content_type='application/json; charset=utf-8')

def month(request, year, month):
    days_and_forms = []
    qs = MoonDay.month_days(year, month)
    
    d = {}
    for day in qs:
        
        d = {
            'day' : day, 
            'morning_form' : RitualForm(auto_id=True, initial = {'ritual' : day.morning_hural.pk} ),
            'day_form' : RitualForm(auto_id=True, initial = {'ritual' : day.day_hural.pk} ),
        }
        days_and_forms.append(d)
    
    ctx = {'today': qs[0], 'days_and_forms': days_and_forms }
    return render(request, 'month.html', context=ctx)

def month_json(request, year, month):
    ds = MoonDay.month_days(year, month)
    rarr = []
    for d in ds:
        rarr.append(d.json())
    data = json.dumps(rarr, indent=2, ensure_ascii=False)
    return HttpResponse(data, content_type='application/json; charset=utf-8')

def hurals_json(request):
    hs = Ritual.hurals()
    rarr = []
    for h in hs:
        rarr.append(h.json())
    
    data = json.dumps(rarr, indent=2, ensure_ascii=False)
    return HttpResponse(data, content_type='application/json; charset=utf-8')

def rituals_json(request):
    hs = Ritual.objects.all()
    rarr = []
    for h in hs:
        rarr.append(h.json())
    
    data = json.dumps(rarr, indent=2, ensure_ascii=False)
    return HttpResponse(data, content_type='application/json; charset=utf-8')


def ritual_json(request, id):
    r =  get_object_or_404(Ritual, pk=id)
    data = json.dumps(r.json(), indent=2, ensure_ascii=False)
    return HttpResponse(data, content_type='application/json; charset=utf-8')
