from django.urls import path
from .views import home, login, register, email_sent, verify
# default account logout view
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', home, name='home'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('email_sent/', email_sent, name='email_sent'),
    path('verify/<str:code>', verify, name='verify'),
    path('logout/', LogoutView.as_view(), name='logout'),

]