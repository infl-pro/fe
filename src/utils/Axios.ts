import axios from 'axios';
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
        }
        return config;
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
            const newAuthorization = data.data.accessToken;

            setCookie(null, 'token', newAuthorization, {
                maxAge: 30 * 24 * 60 * 60, // 쿠키 유효 시간(초 단위)
                path: '/', // 쿠키 경로
                // domain: 'localhost', // 쿠키 도메인
                secure: true, // HTTPS에서만 쿠키 사용 여부
                sameSite: 'none',
            });

            originalRequest.headers.Authorization = `Bearer ${newAuthorization}`;

            return Axios(originalRequest);
        }

        return Promise.reject(err);
    },
);

export default Axios;
