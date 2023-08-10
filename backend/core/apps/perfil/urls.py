from django.urls import path
from .views import UserProfileUpdate, UserViewData, UserProfileUpdateEcommerce, PublicProfileUserView, SendFriendRequest, FriendRequestsList, UserSearchView

urlpatterns = [
    path('update/', UserProfileUpdate.as_view()),
    path('update-ecommerce/', UserProfileUpdateEcommerce.as_view()),
    path('view/', UserViewData.as_view()),
    path('public-profile/<int:pk>/', PublicProfileUserView.as_view()),

    path('send-friend-request/', SendFriendRequest.as_view()),
    path('friend-requests/', FriendRequestsList.as_view()),

    path('search-users/', UserSearchView.as_view()),
]
