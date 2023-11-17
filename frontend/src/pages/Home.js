import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        navigate("/signin");
  };
  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
        navigate("/signin");
    }
  });
    return (
        <div>
            <p>
              <Button variant="contained" onClick={handleSignOut}>
                Sign Out
              </Button>
            </p>
        </div>
    )
}

export default Home