from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Ritual, MoonDay

class RitualResource(resources.ModelResource):
    class Meta:
        model = Ritual

class MoonDayResource(resources.ModelResource):
    class Meta:
        model = MoonDay


class RitualAdmin(ImportExportModelAdmin):
    resource_class = RitualResource

class MoonDayAdmin(ImportExportModelAdmin):
    resource_class = MoonDayResource

admin.site.register(Ritual, RitualAdmin)
admin.site.register(MoonDay, MoonDayAdmin)

# admin.site.register(Ritual)
# admin.site.register(MoonDay)

