from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .models import Item
from .serializer import *
from rest_framework.decorators import action
# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

class ItemDetailView(APIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        return Item.objects.all()

    @action(methods='get', detail=True)
    def get(self, request, pk):
        item = self.get_queryset().get(pk=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    @action(methods=['delete'], detail=True)
    @permission_classes([IsAuthenticated])
    def delete(self, request, pk):
        item = self.get_queryset().get(pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemView(APIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        return Item.objects.all()

    

    @action(methods=['get'], detail=False)
    def get(self, request):
        if "filterUser" in request.GET:
            user = User.objects.filter(username=request.GET.get("filterUser")).first()
            if user:
                items = Item.objects.filter(createdBy=user.id)
            else:
                items = self.get_queryset().order_by('-id')[:10]
        else:
            items = self.get_queryset().order_by('-id')[:10]
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    
    @action(methods=['post'], detail=False)
    def post(self, request):
        if "quantity" in request.data:
            if int(request.data["quantity"]) < 1:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    