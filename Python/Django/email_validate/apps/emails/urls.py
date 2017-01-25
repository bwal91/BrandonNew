from django.conf.urls import url
from django.conf.urls import url
from . import views
urlpatterns = [
	url(r'^$', views.index),
	url(r'^validate$', views.validate),
	url(r'^success$', views.success),
	url(r'^emails/delete/(?P<id>\d+)/$', views.delete),
	url(r'^reset$', views.reset)

]