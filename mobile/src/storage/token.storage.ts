import EncryptedStorage from 'react-native-encrypted-storage';
import { TokenStorage } from '@core/auth/token';

export const mobileTokenStorage: TokenStorage = {
    getToken: async () => {
        return EncryptedStorage.getItem('token');
    },

    setToken: async (token: string) => {
        await EncryptedStorage.setItem('token', token);
    },

    clearToken: async () => {
        await EncryptedStorage.removeItem('token');
    },
};