from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.urls import re_path
from django.views.generic import RedirectView


def logout_view(request):
    logout(request)
    return render(request, 'registration/login.html')
    # Redirect to a success page.
