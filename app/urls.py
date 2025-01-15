from django.urls import path
from .views import deck

urlpatterns = [
    path('deck',deck,name='deck'),
]