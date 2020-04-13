from django.db import models

class Make(models.Model):
    name = models.CharField(max_length=200, unique=True)
    def __str__(self):
        return self.name


class VModel(models.Model):
    name = models.CharField(max_length=200, unique=True)
    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class Vehicle(models.Model):
    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    v_model = models.ForeignKey(VModel, on_delete=models.CASCADE)
    year = models.CharField(max_length=5)
    # trims = models.ManyToManyField('TrimFeature')
    def __str__(self):
        print("this is the type: ")
        print(type(self.v_model))
        print(self.v_model)

        return self.year + " " + self.v_model.name


# class Trim(models.Model):
#     name = models.CharField(max_length=200)
#     def __str__(self):
#         return self.name


# class Feature(models.Model):
#     name = models.CharField(max_length=200)
#     def __str__(self):
#         return self.name


# class TrimFeature(models.Model):
#     trim = models.ForeignKey(Trim, on_delete=models.PROTECT)
#     feature = models.ForeignKey(Feature, on_delete=models.PROTECT)
#     standard = models.BooleanField(default=False)
#     def __str__(self):
#         return self.name
