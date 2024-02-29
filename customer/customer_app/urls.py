from django.urls import path
from . import views
from django.conf import settings
from .views import CustomerListCreateAPIView


urlpatterns = [
    path(
        "customers/", CustomerListCreateAPIView.as_view(), name="customer-list-create"
    ),
    # path('customers/', views.getData),
    # path('customers/', views.postData),
]
