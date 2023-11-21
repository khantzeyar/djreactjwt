from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.contrib.auth.models import User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    #Check if the username exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username is already taken'}, status=status.HTTP_400_BAD_REQUEST)

    #Create a new user
    user = User.objects.create_user(username=username, password=password)

    #Managing JWT Tokens
    refresh_token = RefreshToken.for_user(user)
    access_token = str(refresh_token.access_token)

    return Response({'access': access_token, 'refresh': str(refresh_token)}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            #Perform Django login
            login(request, user)

            #Managing JWT Tokens
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)

            return Response({'access': access_token, 'refresh': str(refresh_token)}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({'user':user.username})

@receiver(user_logged_in)
def post_login(sender, user, request, **kwargs):
    refresh_token = RefreshToken.for_user(user)
    access_token = str(refresh_token.access_token)
    print("refresh: " + str(refresh_token) + "\n")
    print("access: " + access_token)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send("auth_group", {"type": "user.notification", "message": "User logged in."},))

@receiver(user_logged_out)
def post_logout(sender, user, request, **kwargs):
    print("logged out")
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send("auth_group", {"type": "user.notification", "message": "User logged out."},))
