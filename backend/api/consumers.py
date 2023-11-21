from channels.generic.websocket import AsyncWebsocketConsumer

import json

class AuthorisationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("auth_group", self.channel_name)
        await self.send_hello_world()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("auth_group", self.channel_name)

    async def send_hello_world(self):
        await self.send_notification("Hello World!")
    
    async def send_notification(self, message):
        message_data = {
            'type': 'notification.message',
            'message': message,
        }
        await self.send(text_data=json.dumps(message_data))

