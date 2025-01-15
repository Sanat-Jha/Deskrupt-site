from django.urls import path
from .views import *
urlpatterns = [
    path('', home, name='home'),
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('dashboard/', dashboard, name='dashboard'),
    path('edit/<str:title>', edit, name='edit'),
    path('createnewdeck/', createnewdeck, name='createnewdeck'),
    path('saveedits/', saveedits, name='saveedits'),
    path('deletedeck/', deletedeck, name='deletedeck'),
    path('downloadapp/', downloadapp, name='downloadapp'),
    path('fonts-gallery/', fonts_gallery, name='fonts_gallery'),

    
]