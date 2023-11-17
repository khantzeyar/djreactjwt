import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate("/signin");
  };
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