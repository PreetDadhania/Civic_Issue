from django.urls import path
from .views import (
    IssueCreateView, MyIssuesView, CommunityIssuesView, UpvoteIssueView,
    AdminIssueListView, AdminIssueStatusUpdateView
)

urlpatterns = [
    path('issues/', IssueCreateView.as_view(), name='issue-create'),
    path('issues/mine/', MyIssuesView.as_view(), name='my-issues'),
    path('issues/community/', CommunityIssuesView.as_view(), name='community-issues'),
    path('issues/<int:pk>/upvote/', UpvoteIssueView.as_view(), name='issue-upvote'),

    # Admin endpoints
    path('admin/issues/', AdminIssueListView.as_view(), name='admin-issue-list'),
    path('admin/issues/<int:pk>/status/', AdminIssueStatusUpdateView.as_view(), name='admin-issue-status-update'),
]
