from django.shortcuts import render, redirect
from ..login.models import Registrations


def index(request):

	return render(request, 'meta_tag/generator.html')
