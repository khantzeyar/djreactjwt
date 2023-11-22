from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import RequestFactory


import json

def get_response(request):
    return "hello"

class AuthorisationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("auth_group", self.channel_name)
        await self.send_hello_world()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("auth_group", self.channel_name)
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get("type")

        #When the user signs in from react
        if message_type == "login":
            username = data.get("username")
            password = data.get("password")
            print("username: "+username + "\n" + "password: " + password)

            request_factory = RequestFactory()
            request = request_factory.get("/")
            middleware = SessionMiddleware(get_response(request))
            middleware.process_request(request)
            await sync_to_async(request.session.save)()

            user = await sync_to_async(authenticate)(request, username=username, password=password)
            if user is not None:
                await sync_to_async(login)(request, user)
                
        elif message_type == "logout":
            request_factory = RequestFactory()
            request = request_factory.get("/")
            middleware = SessionMiddleware(get_response(request))
            middleware.process_request(request)
            await sync_to_async(request.session.save)()

            await sync_to_async(logout)(request)

    async def send_hello_world(self):
        await self.send_notification("Hello World!")
    
    async def send_notification(self, message):
        message_data = {
            'type': 'notification.message',
            'message': message,
        }
        await self.send(text_data=json.dumps(message_data))

