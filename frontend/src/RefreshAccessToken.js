import axios from 'axios';

axios.defaults.withCredentials = true

const RefreshAccessToken = async() =>{
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
            const newAccessToken = response.data.access;
            localStorage.setItem('accessToken', newAccessToken);
            alert('Access token refreshed: ' + newAccessToken);
        }catch (error){
            alert('Token refresh failed!: \n' + error);
        }
    }
}
export default RefreshAccessToken