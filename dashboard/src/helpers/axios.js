import axios from 'axios';
import { api } from '../urlConfig';
import { store } from '../store';
import { authConstants } from '../actions/constants';

const token = window.localStorage.getItem('token')
const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
});

//axios middlewares - interceptors (You can intercept requests or responses before they are handled by then or catch)
axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;    //refresh token if we get status 500/400 from below 👇
    }
    return req;
})

//dispatch LOUGOUT_SUCCESS action if we got JWT expired or something similar to status 500/400
axios.interceptors.response.use(() => {
    return res
}, (error) => {
    console.log(error);
    const { status } = error.response;
    if (status === 500 || status === 400) {
        localStorage.clear()
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
    return Promise.reject(error)
})

export default axiosInstance