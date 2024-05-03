from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib import auth
import uuid
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime, timedelta

from .models import CustomUser
from .encrypt import encrypt_password, verify_password

def home(request):
    return render(request, 'app/home.html')

def login(request):

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        # Prevent from SQL Injection
        username = username.replace(" ", "")
        username = str(username)
        
        password = str(password)

        print(username, password)

        user = CustomUser.objects.filter(username=username,verified = True).first()

        # Check if password is older than 30 days
        try:
            user_password_date = user.last_password_change_date

            if user_password_date is not None:
                if user_password_date < (datetime.now() - timedelta(days=30)):
                    messages.error(request, 'Your password is older than 30 days. Please change your password')
                    return redirect('change_password')
        except:
            pass

        if user is not None:
            encrypted_password = user.password
            password_verify = verify_password(password, encrypted_password)
        
            if password_verify:
                messages.success(request, 'You are now logged in')
                return redirect('home')
            
            else:
                messages.error(request, 'Incorrect Password')
                return redirect('login')
        else:
            messages.error(request, 'User Does not exist or has not verified yet!')
            return redirect('login')
        
    elif request.method == 'GET':
        return render(request, 'app/login.html')

def register(request):

    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['repeat-password']

        if password == password2:
            if CustomUser.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists')
                return redirect('register')
            else:
                if CustomUser.objects.filter(email=email).exists():
                    messages.error(request, 'Email already exists')
                    return redirect('register')
                else:
                    password = encrypt_password(password)
                    print(f"Encrypted Password: {password}")
                    # random 10 digit code
                    verification_code = uuid.uuid4().hex[:10].upper()
                    user = CustomUser.objects.create(username=username, email=email, password=password, verification_code=verification_code)
                    user.save()

                    host = request.get_host()

                    # send email
                    subject = 'Verify your account'
                    message = f'Hi {username},\n\nPlease verify your account by clicking on the link below:\n\nhttp://{host}/verify/{username}_{verification_code}\n\nThanks'
                    email_from = settings.EMAIL_HOST_USER
                    recipient_list = [email]
                    send_mail(subject, message, email_from, recipient_list)

                    messages.success(request, 'You are now registered and can log in')
                    return redirect('email_sent')
        else:
            messages.error(request, 'Passwords do not match')
            return redirect('register')
    elif request.method == 'GET':
        return render(request, 'app/register.html')

def verify(request, code):
    code = code.split('_')
    username = code[0]
    verification_code = code[1]

    user = CustomUser.objects.filter(username=username).first()

    if user is not None:
        if user.verification_code == verification_code:
            user.verified = True
            user.save()
            messages.success(request, 'Your account has been verified')
            return redirect('login')
        else:
            messages.error(request, 'Invalid Verification Code')
            return redirect('register')


def email_sent(request):
    return render(request, 'app/email_sent.html')