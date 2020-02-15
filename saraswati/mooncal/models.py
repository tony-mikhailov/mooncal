from datetime import *
import calendar

from django.db import models
from django.db.models.sql import where
from mooncal.qol import noneOrPk


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
        return "%s" % (self.short_name)
        # return "%d; %s" % (self.pk, self.short_name)

    def json(self):
        return {'id': self.pk,
                'short_name' : self.short_name,
                'long_name' : self.long_name,
                'is_hural' : self.is_hural,
                'celebration_hural' : self.celebration_hural,
                'for_best_reincarnation' : self.for_best_reincarnation,
                'note_allowed' : self.note_allowed,
                'note_for_one_name' : self.note_for_one_name,
                'note_fix_price' :self.note_fix_price,
                'description' : self.description,
                'description_link' : self.description_link,
                'video_link' : self.video_link
                }

    @staticmethod
    def hurals():
        return Ritual.objects.filter(is_hural=True);
    
    
        
class MoonDay(models.Model):
    year = models.IntegerField()
    day_no = models.IntegerField()
    moon_day_no = models.IntegerField()
    
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
    def moon_day_no_p(self):
        return self.moon_day_no
    
    @moon_day_no_p.setter
    def moon_day_no_p(self, value):
        if value:
            future_days = MoonDay.objects.filter(year=self.year, day_no__gte=self.day_no)
            i0 = value
            for futday in future_days:
                i0 = i0 + 1 if i0 < 29 else 1
                futday.moon_day_no = i0
                print("%d"%(futday.moon_day_no))
                # futday.save()

    @staticmethod
    def today():
        td = date.today()
        return MoonDay.objects.get(year=td.year, day_no=td.timetuple().tm_yday-1)
    
    @staticmethod
    def month_days(year, month):
        (fd, ld) = (date(year=year,month=month, day=1), date(year=year,month=month, day=calendar.monthrange(year, month)[1]))
        (fd_no, ld_no) = (fd.timetuple().tm_yday-1, ld.timetuple().tm_yday-1)
        return MoonDay.objects.filter(year=year,day_no__gte=fd_no,day_no__lte=ld_no)

    def tm_day(self):
        td = date.fromordinal(self.date().toordinal()+1)
        return td.timetuple().tm_mday

    def tm_month(self):
        td = date.fromordinal(self.date().toordinal()+1)
        return td.timetuple().tm_mon
    
    def tm_year(self):
        td = date.fromordinal(self.date().toordinal()+1)
        return td.timetuple().tm_year

    def ys_day(self):
        td = date.fromordinal(self.date().toordinal()-1)
        return td.timetuple().tm_mday

    def ys_month(self):
        td = date.fromordinal(self.date().toordinal()-1)
        return td.timetuple().tm_mon
    
    def ys_year(self):
        td = date.fromordinal(self.date().toordinal()-1)
        return td.timetuple().tm_year

    def tomorrow(self):
        td = date.today()+1
        return MoonDay.objects.get(year=td.year, day_no=td.timetuple().tm_yday-1)

    def yesterday(self):
        td = date.today()-1
        return MoonDay.objects.get(year=td.year, day_no=td.timetuple().tm_yday-1)
    

    def date(self):
        fd = datetime(self.year, 1, 1)
        rd = fd + timedelta(days=self.day_no)
        return rd

    def date_str(self):
        return self.date().strftime("%Y-%m-%d")

    def month(self):
        return self.date().strftime("%m")

    def month_fullname(self):
        return self.date().strftime("%B")


    def day(self):
        return self.date().strftime("%d")

    def weekday(self):
        return self.date().weekday()

    
    def url(self):
        from django.urls import reverse
        return reverse('day', args=[str(self.year), self.month(), self.day() ])
    
    
    def json(self):
        return {'id': self.pk,
                'year' : self.year,
                'month' : self.month(),
                'day' : self.day(),
                'weekday': self.weekday() + 1,
                'date' : self.date_str(),
                
                'url' : self.url(),
                
                'day_no' : self.day_no, 
                'moon_day_no' :self.moon_day_no,
                
                'morning_hural_id' : noneOrPk(self.morning_hural),
                'day_hural_id' : noneOrPk(self.day_hural),
                'night_hural_id' :  noneOrPk(self.night_hural),
            
                'refuge' : self.refuge,
                'pujah' : self.pujah,
                'mandala_destruction' : self.mandala_destruction,
                'lusuud' : self.lusuud,
                'tsetar' : self.tsetar,
                'baldjinima' : self.baldjinima,
                'dashinima' : self.dashinima,
                'tersuud' : self.tersuud ,
                'modon_hohimoy' : self.modon_hohimoy,
                'riha' : self.riha,
                'pagshag' : self.pagshag,
                'good_for_haircutself.' : self.good_for_haircut,
                'good_for_travel': self.good_for_travel,
                'significant_day': self.significant_day,
                'comment' : self.comment,
                'article_link' : self.article_link,
                'lamas_checked' : self.lamas_checked
                } 
    
    def __str__(self):
        return "%s:%s Year day no %s; moon day no %s; (%s, %s) " % (str(self.pk), str(self.date().strftime("%Y-%m-%d") ), str(self.day_no), str(self.moon_day_no), self.morning_hural, self.day_hural)