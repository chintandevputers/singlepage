# serializers.py
from rest_framework import serializers
from .models import CustomerDetails

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerDetails
        fields = ['customer_id', 'first_name', 'last_name', 'date_of_birth', 'phone_number']
