"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from api.consumers import AuthorisationConsumer
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/auth/', AuthorisationConsumer.as_asgi()),
        ]),
    )
})
