# Generated by Django 3.0 on 2020-03-05 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mooncal', '0013_auto_20200305_2014'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='video_link',
            field=models.URLField(blank=True, null=True),
        ),
    ]