from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.signals import user_logged_in, user_logged_out
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache

import json
import asyncio

class AuthorisationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        user_logged_in.connect(self.user_logged_in_handler)
        user_logged_out.connect(self.user_logged_out_handler)
        asyncio.create_task(self.send_periodic_messages())

    async def disconnect(self, close_code):
        user_logged_in.disconnect()
        user_logged_out.disconnect()
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get("type")

        #When the user signs in from react
        if message_type == "login":
            username = data.get("username")
            password = data.get("password")
            print("username: " + username + " password: " + password)
            
    def user_logged_in_handler(self, sender, request, user, **kwargs):
        refresh_token = RefreshToken.for_user(user)
        access_token = str(refresh_token.access_token)
        cache.set('message_type', 'login', timeout=60)
        cache.set('access', access_token, timeout=60)
        cache.set('refresh', str(refresh_token), timeout=60)

    def user_logged_out_handler(self, sender, request, user, **kwargs):
        cache.set('message_type', 'logout', timeout=60)
    
    async def send_periodic_messages(self):
        while True:
            message_type = cache.get('message_type')
            if message_type == 'login':
                message_data = {
                    'type': message_type,
                    'access': cache.get('access'),
                    'refresh': cache.get('refresh'),
                }
                await self.send(text_data=json.dumps(message_data))
                cache.clear()
            elif message_type == 'logout':
                message_data = {
                    'type': message_type,
                }
                await self.send(text_data=json.dumps(message_data))
                cache.clear()
            await asyncio.sleep(1)

