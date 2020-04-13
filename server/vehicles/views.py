from django.shortcuts import HttpResponse
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from vehicles.serializers import MakeSerializer, VModelSerializer, VehicleSerializer
from django.views.decorators.csrf import csrf_exempt
from vehicles.models import Make, VModel, Vehicle
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 3

    def get_current_page(self):
        if self.page.has_next():
            # if self.page.next_page_number():
            return self.page.next_page_number() - 1
        elif self.page.has_previous():
            return self.page.previous_page_number() + 1
        return 1

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'current':self.request.build_absolute_uri(),
            'cpage':self.get_current_page(),
            'page_size':self.page_size,
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'results': data
        })
    

class MakeListViewSet(viewsets.ModelViewSet):
    serializer_class = MakeSerializer
    queryset = Make.objects.all()


class VModelListViewSet(viewsets.ModelViewSet):
    serializer_class = VModelSerializer
    queryset = VModel.objects.all()

    def list(self, request):
        make = request.query_params.get('make', False)
        if make:
            queryset = self.get_queryset().filter(make=make)
        else:
            queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class VehicleListViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
    pagination_class = CustomPagination

