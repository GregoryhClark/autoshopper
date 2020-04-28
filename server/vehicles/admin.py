from django.contrib import admin

# Register your models here.
from .models import Make, VModel, Vehicle

admin.site.register(Make)
admin.site.register(VModel)
admin.site.register(Vehicle)
