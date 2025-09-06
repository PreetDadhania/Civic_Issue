from django.db import models
from django.conf import settings

class Issue(models.Model):
	STATUS_CHOICES = [
		('Pending', 'Pending'),
		('In Progress', 'In Progress'),
		('Resolved', 'Resolved'),
	]
	CATEGORY_CHOICES = [
		('potholes', 'Potholes'),
		('garbage', 'Garbage'),
		('streetlight', 'Streetlight'),
		('water', 'Water'),
	]
	title = models.CharField(max_length=255)
	description = models.TextField()
	image = models.ImageField(upload_to='issue_images/', blank=True, null=True)
	location = models.CharField(max_length=255)
	latitude = models.FloatField(blank=True, null=True)
	longitude = models.FloatField(blank=True, null=True)
	category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='potholes')
	status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
	created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='issues')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	upvotes = models.PositiveIntegerField(default=0)

	def __str__(self):
		return self.title
