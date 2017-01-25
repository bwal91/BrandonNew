from __future__ import unicode_literals

from django.db import models

class Emails(models.Model):
	email_add = models.CharField(max_length=200)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)