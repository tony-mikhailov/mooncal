# Generated by Django 3.0 on 2020-02-26 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mooncal', '0004_event'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='title',
            field=models.TextField(default='def', max_length=108),
            preserve_default=False,
        ),
    ]