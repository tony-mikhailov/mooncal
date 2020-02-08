from builtins import object
from datetime import *

import calendar

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from django.template.defaultfilters import first

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
    qs = MoonDay.objects.filter(year=year,day_no=date.timetuple().tm_yday-1)
    # data = serializers.serialize("json", qs, indent=2, ensure_ascii=False)
    
    ctx = { 'today': qs.first }
    return render(request, 'today.html', context=ctx)


def day_json(request, year, month, day):
    
    date = date_conv(year,month,day)
    qs = MoonDay.objects.filter(year=year,day_no=date.timetuple().tm_yday-1)
    data = serializers.serialize("json", qs, indent=2, ensure_ascii=False)
    
    return HttpResponse(data, content_type='application/json; charset=utf-8')

def month(request, year, month):
    date = date_conv(year,month,1)
    print (date.timetuple())
    qs = MoonDay.objects.filter(year=year,day_no=date.timetuple().tm_yday-1)
    ctx = { 'today': qs.first }
    return render(request, 'month.html', context=ctx)

def month_json(request, year, month):
    qs = MoonDay.month_days(year, month)
    data = serializers.serialize("json", qs, indent=2, ensure_ascii=False)
    return HttpResponse(data, content_type='application/json; charset=utf-8')

