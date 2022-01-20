from django.urls import path
from rest_framework import routers

from temperature import views

router = routers.SimpleRouter()
router.register(r'', views.ValueGenericViewSet, basename='temp')

urlpatterns = [path('sse/', views.sse), *router.urls]
