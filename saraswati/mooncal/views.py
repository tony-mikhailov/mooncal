from builtins import object
from datetime import *

from django.http import HttpResponse
from django.shortcuts import render

import mooncal.cal_helpers

from .models import MoonDay, Ritual


def index(request):
    return HttpResponse("Hello, world. You're at the index.")

def today(request):
    ctx = { 'today': MoonDay.today() }
    return render(request, 'today.html', context=ctx)
