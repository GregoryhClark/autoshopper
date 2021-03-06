# Generated by Django 2.2 on 2020-04-06 21:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Make',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('make', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicles.Make')),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(max_length=5)),
                ('make', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicles.Make')),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicles.Model')),
            ],
        ),
    ]
