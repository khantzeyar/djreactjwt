import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function SignUpCode(){
  //Keep track of changes to username and password
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signin");
  };

  //Lets the user access the Sign In page if they don't have an account
  const handleSignIn = () => {
      navigate("/signin");
  };

  return (
    <form>
      <h2>Sign Up</h2>
      <label>User Name:{' '} 
       <input type="text" onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <p></p>
      <label>Password:{' '} 
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <p>
        <Button variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
      </p>
      <p style={{fontSize: 16}}>Already have an account? <Button variant="text" onClick={handleSignIn}> Sign In</Button></p>
    </form>
  )
}

function SignUp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <SignUpCode />
      </header>
    </div>
  );
}

export default SignUp;