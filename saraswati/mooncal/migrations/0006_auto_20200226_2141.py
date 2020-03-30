# Generated by Django 3.0 on 2020-02-26 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saraswati', '0005_event_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='begin_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='end_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='title',
            field=models.TextField(blank=True, max_length=108, null=True),
        ),
    ]
