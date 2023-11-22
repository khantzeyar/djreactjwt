import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SignOutButton from '../ui/SignOutButton';
import RefreshAccessToken from '../RefreshAccessToken';

axios.defaults.withCredentials = true

function Home() {
  const [user, setUser] = useState('');

  var socket = new WebSocket("ws://localhost:8000/ws/auth/");
  //Manage the web socket
  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log(event.data)
      if (message.type === "logout"){
        localStorage.setItem('logoutRedirect', window.location.pathname);
        localStorage.removeItem('accessToken');
        window.location.replace('/signin');
      }
    };
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    return () => {
      socket.close();
    };
  });

  //Displays the user's username when they enter the homepage.
  useEffect(() => {
    RefreshAccessToken();
    const accessToken = localStorage.getItem('accessToken');
    axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
      })
        .then(response => {
        setUser(response.data.user);
      })
        .catch(error => {
        alert(error);
      });
  });
    return (
        <div>
            <h1>Welcome, {user}</h1>
            <p>
              <SignOutButton/>
            </p>
        </div>
    )
}

export default Home