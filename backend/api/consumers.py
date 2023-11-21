from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.signals import user_logged_in, user_logged_out
from rest_framework_simplejwt.tokens import RefreshToken
import json

class AuthorisationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    def send_notification(self, message):
        message_data = {
            "type": "notification.message",
            "message": message,
        }
        self.send(json.dumps(message_data))
    
    def post_login(self, sender, user, request, **kwargs):
        refresh_token = RefreshToken.for_user(user)
        access_token = str(refresh_token.access_token)
        message = f"refresh: {refresh_token}\naccess: {access_token}"
        self.send_notification(message)

    def post_logout(self, sender, user, request, **kwargs):
        message = "logged out"
        self.send_notification(message)