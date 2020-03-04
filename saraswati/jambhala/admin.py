from datetime import *

from django.contrib import admin
from django.db import models
from django.db.models.sql import where
from django.utils.translation import ugettext_lazy as _
from rest_framework.fields import BooleanField
from django.core.validators import MaxValueValidator, MinValueValidator

from mooncal.qol import *


class Transaction(models.Model):
    created_at = models.DateTimeField(verbose_name=_(u'Creation date time'), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_(u'Creation date time'), auto_now_add=True)
    status = models.CharField(max_length=35)
    email = models.EmailField(max_length=254)
    amount = models.IntegerField(
        default=10,
        validators=[
            MaxValueValidator(100000000),
            MinValueValidator(10)
        ]
    )
    currency = models.CharField(max_length=3)
    saved = models.BooleanField()
    
# Register your models here.
