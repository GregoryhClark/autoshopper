from rest_framework import serializers
from vehicles.models import Make, VModel, Vehicle


class MakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Make
        fields = "__all__"


class VModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = VModel
        fields = "__all__"


class VehicleSerializer(serializers.ModelSerializer):
    make = MakeSerializer(read_only = True)
    model = VModelSerializer(read_only = True)
    class Meta:
        model = Vehicle
        fields = "__all__"



# class ModelSerializer(serializers.Serializer):
#     name = serializers.CharField(required=True, allow_blank=False, max_length=100)
#     make = serializers.IntegerField(required=True)

#     def create(self, validated_data):
#         """Create and return a new 'Model' instance, given validated data"""
#         return Model.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#         """Udate and return a model"""
#         instance.name = validated_data.get('name', instance.name)
#         instance.save()
#         return instance


# class VehicleSerializer(serializers.Serializer):
#     make = MakeSerializer
#     model = ModelSerializer
#     year = serializers.CharField(max_length=5)

#     def create(self, validated_data):
#         """create and return new vehicle"""
#         return Vehicle.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         """Update and return vehicle"""
#         instance.make = validated_data.get('make', instance.make)
#         instance.model = validated_data.get('model', instance.model)
#         instance.year = validated_data.get('year', instance.year)



