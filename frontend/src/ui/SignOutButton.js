import { Button } from '@mui/material';
import axios from 'axios';
import React, {useEffect} from 'react';

axios.defaults.withCredentials = true

function SignOutButton(){
    var socket = new WebSocket("ws://localhost:8000/ws/auth/");
    //Manage the web socket
    /*useEffect(() => {
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
    });*/
    //Removes the token to get rid of the user's access. Moves the user to the Sign In page as well.
    const handleSignOut = async () => {
        try{
            if (socket.readyState === WebSocket.OPEN) {
                const message = {type: "logout",};
                socket.send(JSON.stringify(message));
            }
            await axios.post('http://127.0.0.1:8000/api/logout/');
            localStorage.setItem('logoutRedirect', window.location.pathname);
            localStorage.removeItem('accessToken');
            window.location.replace('/signin');
            alert("Sign Out Success!")
        } catch (error){
            alert("Sign Out Failed: " + error)
        }
    };
    return(<Button variant="contained" onClick={handleSignOut}>Sign Out</Button>)
}
export default SignOutButton