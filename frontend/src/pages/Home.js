import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Home() {
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