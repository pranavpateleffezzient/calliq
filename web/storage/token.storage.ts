import { TokenStorage } from '@core/auth/token';

export const webTokenStorage: TokenStorage = {
    getToken: async () => localStorage.getItem('token'),
    setToken: async (token: string) => localStorage.setItem('token', token),
    clearToken: async () => localStorage.removeItem('token'),
};