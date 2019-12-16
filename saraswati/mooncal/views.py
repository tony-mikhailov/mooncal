from builtins import object
from datetime import *

from django.http import HttpResponse
from django.shortcuts import render

import mooncal.cal_helpers

from .models import MoonDay, Ritual


def index(request):
    return HttpResponse("Hello, world. You're at the index.")

def today(request):
    td = date.today()
    fd = date(td.year, 1, 1)
    dd = td-fd
    day_no = dd.days
    md = MoonDay.objects.get(year=td.year, day_no=day_no)

    ctx = { 'today': md }
    return render(request, 'today.html', context=ctx)
