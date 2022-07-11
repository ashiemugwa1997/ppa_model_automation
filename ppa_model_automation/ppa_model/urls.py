from django.urls import path

from . import views

urlpatterns = [
    path('dashboard', views.dashboard, name='dashboard'),
    path('add_assumptions', views.add_assumptions, name='add_assumptions')
]