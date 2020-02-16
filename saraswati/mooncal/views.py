from builtins import object


import calendar
import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template.defaultfilters import first
from django.views.decorators.csrf import csrf_exempt

import mooncal.cal_helpers

from .models import MoonDay, Ritual
from .forms import RitualForm
from .qol import *
from django.urls import reverse
from mooncal.qol import date_conv


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




def day(request, year, month, day):
    
    day = MoonDay.day(year,month,day)
    
    morning_form = RitualForm(auto_id=True, initial = {'ritual' : day.morning_hural.pk, 'title' : 'Yarr'} )
    day_form = RitualForm(auto_id=True, initial = {'ritual' : day.day_hural.pk} )
    
    ctx = { 'today': day, 'morning_form' : morning_form, 'day_form' : day_form }
    return render(request, 'today.html', context=ctx)

@csrf_exempt
def day_json(request, year, month, day):
    if request.method == 'POST':
        qd = request.POST
        yday = MoonDay.year_day(year,month,day)
        
        
        json_data = json.loads(request.body)
        k=next(iter(json_data))
        v=json_data[k]
        print ('process input day' + k + str(v))
        if k == 'morning_hural_id':
            yday.morning_hural = Ritual.objects.get(pk=v)
        elif k == 'day_hural_id':
            yday.day_hural = Ritual.objects.get(pk=v)
        else:
            yday.set(k, v)
        
        yday.save()
        return redirect(reverse('day_json', args=(year, month, day)))
    
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

@csrf_exempt
def month_json(request, year, month):
    ds = MoonDay.month_days(year, month)
    if request.method == 'POST':
        print ('process input month')
        return redirect(reverse('month_json', args=(year, month)))
    
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
