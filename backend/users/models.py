
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
	ROLE_CHOICES = (
		('citizen', 'Citizen'),
		('admin', 'Admin'),
	)
	role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='citizen')
