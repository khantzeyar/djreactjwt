import React, {useEffect, useState} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true

function Home() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    //Removes the token to get rid of the user's access. Moves the user to the Sign In page as well.
    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        navigate("/signin");
  };
  useEffect(() => {
    //Redirects the user if they aren't signed in.
    if (localStorage.getItem('accessToken') === null) {
        navigate("/signin");
    }
    else{
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
    }
  });
    return (
        <div>
            <h1>Welcome, {user}</h1>
            <p>
              <Button variant="contained" onClick={handleSignOut}>
                Sign Out
              </Button>
            </p>
        </div>
    )
}

export default Home