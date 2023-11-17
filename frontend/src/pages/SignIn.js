import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true

function SignUpCode(){
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSignIn = async ()=> {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
            username,
            password
        });
        //Store the access token
        const accessToken = response.data.access;
        alert("Access Token: " + accessToken)
        localStorage.setItem('accessToken', accessToken);
        //Go to home page
        navigate("/");
    }catch (error){
        alert(error)
    }
  };

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