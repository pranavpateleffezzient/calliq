import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://calliq-backend.onrender.com',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});