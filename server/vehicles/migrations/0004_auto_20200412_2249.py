# Generated by Django 2.2 on 2020-04-13 02:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0003_auto_20200412_2209'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Model',
            new_name='VModel',
        ),
        migrations.RenameField(
            model_name='vehicle',
            old_name='model',
            new_name='v_model',
        ),
    ]
