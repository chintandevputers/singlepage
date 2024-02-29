# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomerDetails
from .serializers import CustomerSerializer
from rest_framework.decorators import api_view

# custom_pagination.py
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from urllib.parse import urlencode, urlparse, parse_qs, urlunparse


class CustomPagination(PageNumberPagination):

    def get_paginated_response(self, data):
        return Response(
            {
                "page": self.page.number,
                "per_page": self.page.paginator.per_page,
                "total": self.page.paginator.count,
                "pages": self.page.paginator.num_pages,
                "prev": self.get_previous_link(),
                "next": self.get_next_link(),
                "first": self.get_first_link(),
                "last": self.get_last_link(),
                "results": data,
            }
        )

    def get_first_link(self):
        if not self.page.has_previous():
            return None
        url = self.request.build_absolute_uri()
        page_number = 1
        return self._replace_query_param(url, "page", page_number)

    def get_last_link(self):
        if not self.page.has_next():
            return None
        url = self.request.build_absolute_uri()
        page_number = self.page.paginator.num_pages
        return self._replace_query_param(url, "page", page_number)

    def _replace_query_param(self, url, key, value):
        url_parts = list(urlparse(url))
        query = parse_qs(url_parts[4])
        query[key] = [str(value)]
        url_parts[4] = urlencode(query, doseq=True)
        return urlunparse(url_parts)


class CustomerListCreateAPIView(APIView):

    pagination_class = CustomPagination

    def get(self, request, format=None):

        queryset = CustomerDetails.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = CustomerSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# pagination_class = CustomPagination

# # Create your views here.
# @api_view(['GET'])
# def getData(request):
#     queryset = CustomerDetails.objects.all()
#     paginator = pagination_class()
#     result_page = paginator.paginate_queryset(queryset, request)
#     serializer = CustomerSerializer(result_page, many=True)

#     return paginator.get_paginated_response(serializer.data)


# @api_view(['POST'])
# def postData(request):
#     serializer = CustomerSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
