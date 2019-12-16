from datetime import *

from django.db import models
from django.db.models.sql import where


class Ritual(models.Model):
    short_name = models.CharField(max_length=35)
    long_name = models.CharField(max_length=108)
    is_hural = models.BooleanField(default=True)
    celebration_hural = models.BooleanField(default=False)
    for_best_reincarnation = models.BooleanField(default=False)
    note_allowed = models.BooleanField(default=True)
    note_for_one_name = models.BooleanField(default=False)
    note_fix_price = models.IntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    description_link = models.URLField(null=True, blank=True)
    video_link = models.URLField(null=True, blank=True)     
    
    def __str__(self):
        return "%d; %s" % (self.pk, self.short_name)
        
class MoonDay(models.Model):
    year = models.IntegerField()
    day_no = models.IntegerField()
    _moon_day_no = models.IntegerField(db_column='moon_day_no')
    
    morning_hural = models.ForeignKey(Ritual, related_name='morning2ritual', on_delete=models.CASCADE)
    day_hural = models.ForeignKey(Ritual,related_name='day2ritual', on_delete=models.CASCADE)
    night_hural = models.ForeignKey(Ritual,related_name='night2ritual', on_delete=models.CASCADE, null=True, blank=True)
    
    refuge = models.BooleanField(default=False)
    pujah = models.BooleanField(default=False)
    mandala_destruction = models.BooleanField(default=False)
    lusuud = models.BooleanField(default=False)
    tsetar = models.BooleanField(default=False)
    baldjinima = models.BooleanField(default=False)
    dashinima = models.BooleanField(default=False)
    tersuud = models.BooleanField(default=False)
    modon_hohimoy = models.BooleanField(default=False)
    riha = models.BooleanField(default=False)
    pagshag = models.BooleanField(default=False)
    good_for_haircut = models.BooleanField(default=False)
    good_for_travel = models.BooleanField(default=False)
    significant_day = models.BooleanField(default=False)
    comment = models.TextField(null=True, blank=True)
    article_link = models.URLField(null=True, blank=True)     
    lamas_checked = models.BooleanField(default=False)

    @property
    def moon_day_no(self):
        return self._moon_day_no
    
    @moon_day_no.setter
    def moon_day_no(self, value):
        if value:
            future_days = MoonDay.objects.filter(year=self.year, day_no__gte=self.day_no)
            i0 = value
            for futday in future_days:
                i0 = i0 + 1 if i0 < 29 else 1
                futday._moon_day_no = i0
                print("%d"%(futday._moon_day_no))
                # futday.save()



    def date(self):
        fd = datetime(self.year, 1, 1)
        rd = fd + timedelta(days=self.day_no)
        return rd
    
    def __str__(self):
        return "%s:%s day no %s; moon day no %s; (%s, %s) " % (str(self.pk), str(self.date().strftime("%Y-%m-%d") ), str(self.day_no), str(self.moon_day_no), self.morning_hural, self.day_hural)