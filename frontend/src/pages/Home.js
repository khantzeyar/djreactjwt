import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SignOutButton from '../ui/SignOutButton';

axios.defaults.withCredentials = true

function Home() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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