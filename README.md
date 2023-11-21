# djreactjwt
A full stack application using Django as the backend and React as the frontend. JWT(JSON Web Tokens) are used to handle the authorisation in the application. 

## backend
The virtualenv package is used to manage a virtual enviroment for Django in this project. The enviroment can be activated using the following command: source env/bin/activate. The following packages are installed (pip install) in the enviroment to be used with the backend: django, djangorestframework, django-cors-headers, djangorestframework_simplejwt, channels, channels-redis, daphne. The app uses redis channel layer backend with django. (arch -arm64 brew install). Use the following command to start the redis server: redis-server.

## frontend
Node.js is used with React for the frontend. The following packages are installed (npm install) for use in the application: axios, react-router-dom@6, @mui/material @emotion/react @emotion/styled