# Generated by Django 3.0 on 2020-03-05 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mooncal', '0012_auto_20200304_1815'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='ritual_id',
            new_name='ritual',
        ),
    ]