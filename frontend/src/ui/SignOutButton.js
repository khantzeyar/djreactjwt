import { Button } from '@mui/material';
import axios from 'axios';

axios.defaults.withCredentials = true

function SignOutButton(){
    //Removes the token to get rid of the user's access. Moves the user to the Sign In page as well.
    const handleSignOut = async () => {
        try{
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