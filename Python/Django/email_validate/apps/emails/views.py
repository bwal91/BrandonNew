from django.shortcuts import render, redirect
from .models import Emails
import re

def index(request):
	if not 'notvalid' in request.session:
		request.session['notvalid']=""
	if not 'email' in request.session:
		request.session['email']=""
	return render(request, 'emails/index.html')

def validate(request):
	
	if request.method == "POST":
		request.session['email']=request.POST['email']
		match=re.search(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", request.POST['email'])
		if match:
			Emails.objects.create(email_add=request.POST['email'])
			return redirect('/success')
		else:
			request.session['notvalid']='notvalid'
			return redirect('/')

def success(request):
	context = {
		'email': Emails.objects.all(),
		"id": id
	}
	return render(request, 'emails/result.html', context)

def delete(request, id):
	Emails.objects.filter(id=id).delete()
	return redirect('/success')

def reset(request):
	del request.session['notvalid']
	del request.session['email']
	return redirect('/')