from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from api.consumers import AuthorisationConsumer
application = ProtocolTypeRouter(
    {
    "websocket": 
        URLRouter([
            path('ws/auth/', AuthorisationConsumer.as_asgi()),
        ]),
})