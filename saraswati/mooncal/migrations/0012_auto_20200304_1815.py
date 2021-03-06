# Generated by Django 3.0 on 2020-03-04 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mooncal', '0011_auto_20200227_1020'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='bg_color',
            field=models.CharField(blank=True, help_text='HEX color, as #RRGGBB', max_length=7, null=True, verbose_name='Background Color'),
        ),
        migrations.AddField(
            model_name='event',
            name='fg_color',
            field=models.CharField(blank=True, help_text='HEX color, as #RRGGBB', max_length=7, null=True, verbose_name='Foreground Color'),
        ),
        migrations.AddField(
            model_name='moonday',
            name='bg_color',
            field=models.CharField(blank=True, help_text='HEX color, as #RRGGBB', max_length=7, null=True, verbose_name='Background Color'),
        ),
        migrations.AddField(
            model_name='moonday',
            name='fg_color',
            field=models.CharField(blank=True, help_text='HEX color, as #RRGGBB', max_length=7, null=True, verbose_name='Foreground Color'),
        ),
        migrations.AddField(
            model_name='ritual',
            name='bg_color',
            field=models.CharField(blank=True, help_text='HEX color, as #RRGGBB', max_length=7, null=True, verbose_name='Background Color'),
        ),
        migrations.AddField(
            model_name='ritual',
            name='fg_color',
            field=models.CharField(blank=True, help_text='HEX color, as #RRGGBB', max_length=7, null=True, verbose_name='Foreground Color'),
        ),
    ]
