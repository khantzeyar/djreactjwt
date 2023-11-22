from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import RefreshToken

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
            password = data.get("password")
            print("username: " + username + " password: " + password)
            
    
    async def send_periodic_messages(self):
        repeat = True
        while (repeat):
            if self.user.is_authenticated:
                refresh_token = RefreshToken.for_user(self.user)
                access_token = refresh_token.access_token
                message_data = {'type': "login", "refresh": str(refresh_token), "access": str(access_token)}
                await self.send(text_data=json.dumps(message_data))
                repeat = False
            await asyncio.sleep(1)

