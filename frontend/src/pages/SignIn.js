import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true

function SignUpCode(){
  //Keep track of changes to username and password
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate();
  
  //Signs In the user through Django
  const handleSignIn = async ()=> {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
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
        //Handling navigation
        const redirectURL = localStorage.getItem('logoutRedirect');
        if (redirectURL === null) {
          window.location.replace("/");
        }
        else
        {
          window.location.replace(redirectURL);
          localStorage.removeItem('logoutRedirect');
        }
    }catch (error){
        alert("Sign In Failed!\n " + error)
    }
  };

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
          <SignUpCode />
      </header>
    </div>
  );
}

export default SignIn;