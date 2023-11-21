import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true

function SignInCode(){
  //Keep track of changes to username and password
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate();
  
  //Signs In the user through Django
  const handleSignIn = async ()=> {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            username,
            password
        });
        //Store the access token
        const accessToken = response.data.access;
        alert("Sign In Success!\nAccess Token: " + accessToken)
        localStorage.setItem('accessToken', accessToken);
        //Store the refresh token
        const refreshToken = response.data.refresh;
        localStorage.setItem('refreshToken', refreshToken);
        window.location.reload();
    }catch (error){
        alert("Sign In Failed!\n " + error)
    }
  };

  //Handling navigation
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    if (isAuthenticated){
      const redirectURL = localStorage.getItem('logoutRedirect');
        if (redirectURL === null) {
          window.location.replace("/");
        }
        else
        {
          window.location.replace(redirectURL);
          localStorage.removeItem('logoutRedirect');
        }
    }
  });

  //Manage the web socket
  useEffect(() => {
    var socket = new WebSocket("ws://localhost:8000/ws/auth/");
    socket.onopen = () => {
      alert("WebSocket connection established.");
    };
    socket.onmessage = (event) => {
      alert(event.data)
    };
    socket.onclose = () => {
      alert("WebSocket connection closed.");
    };
    return () => {
      socket.close();
    };
  }, []);

  //Lets the user visit the Sign Up page if they don't have an account
  const handleSignUp = () => {
      navigate("/signup");
  };

  return (
    <form>
      <h2>Sign In</h2>
      <label>User Name:{' '} 
       <input type="text" onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <p></p>
      <label>Password:{' '} 
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <p>
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
      </p>
      <p style={{fontSize: 16}}>Don't have an account? <Button variant="text" onClick={handleSignUp}> Sign Up</Button></p>
    </form>
  )
}

function SignIn() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <SignInCode />
      </header>
    </div>
  );
}

export default SignIn;