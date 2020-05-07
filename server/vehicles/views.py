from django.shortcuts import HttpResponse
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from vehicles.serializers import MakeSerializer, VModelSerializer, VehicleSerializer
from django.views.decorators.csrf import csrf_exempt
from vehicles.models import Make, VModel, Vehicle
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework_extensions.mixins import PaginateByMaxMixin
from rest_framework import filters
from rest_framework import generics


class CustomPagination( PageNumberPagination):
    page_size = 5

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
    

    def get_queryset(self):
        qs = super().get_queryset()
        selected_make = self.request.query_params.get('make', None)
        if selected_make:
            try:
                found_make = Make.objects.get(name__icontains=selected_make)
            except:
                return []
            if found_make:
                if found_make.id:
                    qs = qs.filter(make=found_make.id)
        selected_v_model = self.request.query_params.get('v_model', None)
        if selected_v_model:
            try:
                found_v_model = VModel.objects.get(name__icontains=selected_v_model)
            except:
                return []
            if found_v_model:
                if found_v_model.id:
                    qs = qs.filter(v_model=found_v_model.id)
        selected_year = self.request.query_params.get('year', None)
        if selected_year:
            qs = qs.filter(year=selected_year)
        return qs


class VehicleListView(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['year', 'v_model__name','make__name']



