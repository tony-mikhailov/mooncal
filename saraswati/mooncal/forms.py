from django import forms

from .models import Ritual

class RitualForm(forms.Form):
    ritual = forms.ChoiceField(choices = [])

    def __init__(self, *args, **kwargs):
        super(RitualForm, self).__init__(*args, **kwargs)
        self.fields['ritual'].choices = [(x.pk, x.short_name) for x in Ritual.objects.all()]
        # slef.fields['id_for_label']