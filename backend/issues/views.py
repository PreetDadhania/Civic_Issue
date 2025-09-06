
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404
from .models import Issue
from .serializers import IssueSerializer

# Custom permission for admin users
class IsAdminUserCustom(BasePermission):
	def has_permission(self, request, view):
		return request.user.is_authenticated and getattr(request.user, 'role', None) == 'admin'

# Admin: List all issues with filters
class AdminIssueListView(generics.ListAPIView):
	serializer_class = IssueSerializer
	permission_classes = [IsAdminUserCustom]

	def get_queryset(self):
		queryset = Issue.objects.all()
		status_param = self.request.query_params.get('status')
		location_param = self.request.query_params.get('location')
		if status_param:
			queryset = queryset.filter(status=status_param)
		if location_param:
			queryset = queryset.filter(location__icontains=location_param)
		return queryset

# Admin: Update issue status
class AdminIssueStatusUpdateView(APIView):
	permission_classes = [IsAdminUserCustom]

	def patch(self, request, pk):
		issue = get_object_or_404(Issue, pk=pk)
		status_value = request.data.get('status')
		if status_value not in dict(Issue.STATUS_CHOICES):
			return Response({'error': 'Invalid status'}, status=400)
		issue.status = status_value
		issue.save()
		return Response({'id': issue.id, 'status': issue.status}, status=200)

class IssueCreateView(generics.CreateAPIView):
	serializer_class = IssueSerializer
	permission_classes = [permissions.IsAuthenticated]

	def perform_create(self, serializer):
		serializer.save(created_by=self.request.user)

class MyIssuesView(generics.ListAPIView):
	serializer_class = IssueSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return Issue.objects.filter(created_by=self.request.user)

class CommunityIssuesView(generics.ListAPIView):
	serializer_class = IssueSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		queryset = Issue.objects.all().order_by('-upvotes')
		status_param = self.request.query_params.get('status')
		location_param = self.request.query_params.get('location')
		if status_param:
			queryset = queryset.filter(status=status_param)
		if location_param:
			queryset = queryset.filter(location=location_param)
		return queryset

class UpvoteIssueView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def patch(self, request, pk):
		issue = get_object_or_404(Issue, pk=pk)
		issue.upvotes = issue.upvotes + 1
		issue.save()
		return Response({'upvotes': issue.upvotes}, status=status.HTTP_200_OK)
