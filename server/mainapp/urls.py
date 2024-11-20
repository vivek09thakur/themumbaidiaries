from django.urls import path
from . import views

urlpatterns = [
    path('get_user_profile/<str:username>/<str:sessionToken>/', views.get_user_profile, name='get_user_profile'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('create_post/<str:username>/<str:sessionToken>/', views.create_post, name='create_post'),
    path('get_all_posts/', views.get_all_posts, name='get_all_posts'),
]