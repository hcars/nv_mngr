from django.urls import path
from . import views
from .views import ItemView, ItemDetailView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('items/', ItemView.as_view(), name="list_items"),
    path('items/<int:pk>/', ItemDetailView.as_view()),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes)
]
