import { Button } from '@mui/material';
function SignOutButton(){
    //Removes the token to get rid of the user's access. Moves the user to the Sign In page as well.
    const handleSignOut = () => {
        localStorage.setItem('logoutRedirect', window.location.pathname);
        localStorage.removeItem('accessToken');
        window.location.replace('/signin');
    };
    return(<Button variant="contained" onClick={handleSignOut}>Sign Out</Button>)
}
export default SignOutButton