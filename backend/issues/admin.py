from django.contrib import admin
from .models import Issue

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
	list_display = ("id", "title", "category", "status", "created_by", "created_at")
	list_filter = ("category", "status", "created_at")
	search_fields = ("title", "description", "location")
