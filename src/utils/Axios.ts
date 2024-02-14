import axios from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
console.log(process.env.API_BASE_URL);
const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 180000,
    withCredentials: true,
});

Axios.interceptors.request.use(
    config => {
        const { token } = parseCookies();
        if (!token) return config;
        if (config.headers) {
            config.headers['Content-Type'] = 'application/json; charset=utf-8';
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
    },
    err => Promise.reject(err),
);

Axios.interceptors.response.use(
    response => response,
    async err => {
        const {
            config,
            response: { status, data },
        } = err;
        const originalRequest = config;

        if (data.type === 'InsufficientAuthenticationException') {
            // newAuthorization = 새로운 토큰
            const { data } = await Axios.post('/refreshToken');
            const newAuthorization = data.accessToken;
            originalRequest.headers.Authorization = `Bearer ${newAuthorization}`;
            return Axios(originalRequest);
        }

        return Promise.reject(err);
    },
);

export default Axios;
