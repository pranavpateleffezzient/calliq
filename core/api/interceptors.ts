
import { getToken } from '../auth/token';
import { http } from './http';

http.interceptors.request.use(
    async (config) => {
        const token = await getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // optional: logout logic later
        }
        return Promise.reject(error);
    }
);