from django.conf.urls import url
from django.conf.urls import url
from . import views
urlpatterns = [
	url(r'^generator$', views.index, name="index"),

]