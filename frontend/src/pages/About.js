import SignOutButton from "../ui/SignOutButton"
import React, {useEffect} from 'react';

function About(){
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
    return (
        <div>
            <h1>This is the about page.</h1>
            <p>
              <SignOutButton/>
            </p>
        </div>
    )
}
export default About