from builtins import object
from datetime import *

from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers


import mooncal.cal_helpers

from .models import MoonDay, Ritual


def index(request):
    return HttpResponse("Hello, world. You're at the index.")

def today(request):
    ctx = { 'today': MoonDay.today() }
    return render(request, 'today.html', context=ctx)

def today_json(request):
    data = serializers.serialize("json", [MoonDay.today()], indent=2, ensure_ascii=False)
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
    qs = MoonDay.objects.filter(year=year,day_no=date.timetuple().tm_yday)
    data = serializers.serialize("json", qs, indent=2, ensure_ascii=False)
    return HttpResponse(data, content_type='application/json; charset=utf-8')
