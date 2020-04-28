from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("makes", views.MakeListViewSet)
router.register("v_models", views.VModelListViewSet)
router.register("vehicles", views.VehicleListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('<str:some_string>/results', views.results, name='results'),
    # path('features/add', views.add_feature, name='add_feature'),
    # path('add_make', views.add_make, name='add_make'),
    # path('add_model', views.add_model, name='add_model'),
    # path('add', views.add_vehicle, name='add_vehicle'),
]