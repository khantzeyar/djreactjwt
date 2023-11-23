from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from django.contrib.auth import login, logout
from django.http import HttpRequest

import json
import asyncio

class AuthorisationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.user = self.scope["user"]
        asyncio.create_task(self.send_periodic_messages())

    async def disconnect(self, close_code):
        pass
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get("type")

        #When the user signs in from react
        if message_type == "login":
            username = data.get("username")
            user = await self.get_user(username)
            request = HttpRequest()
            request.session = self.scope["session"]
            await self.login_user(request, user)
            print("Login Test")

        #When the user signs out from react
        if message_type == "logout":
            request = HttpRequest()
            request.session = self.scope["session"]
            await self.logout_user(request)
            print("Logout Test")

    @database_sync_to_async
    def get_user(self, username):
        return User.objects.filter(username=username).first()

    @database_sync_to_async
    def login_user(self, request, user,):
        login(request, user)

    @database_sync_to_async
    def logout_user(self, request):
        logout(request)
    
    async def send_periodic_messages(self):
        repeat = True
        while (repeat):
            if self.user.is_authenticated:
                refresh_token = RefreshToken.for_user(self.user)
                access_token = refresh_token.access_token
                message_data = {'type': "login", "refresh": str(refresh_token), "access": str(access_token)}
                await self.send(text_data=json.dumps(message_data))
                repeat = False
            else:
                message_data = {'type': "logout"}
                await self.send(text_data=json.dumps(message_data))
                repeat = False
            await asyncio.sleep(1)

