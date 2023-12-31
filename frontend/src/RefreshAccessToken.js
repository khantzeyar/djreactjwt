import axios from 'axios';

axios.defaults.withCredentials = true

const RefreshAccessToken = async() =>{
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/refresh/', { refresh: refreshToken });
            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            console.log(('Access token refreshed: ' + newAccessToken));
        }catch (error){
            console.log(alert('Token refresh failed!: \n' + error));
        }
    }
}
export default RefreshAccessToken