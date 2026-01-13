import { TokenStorage } from '@core/auth/token';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const mobileTokenStorage: TokenStorage = {
    getToken: async () => {
        return AsyncStorage.getItem('token');
    },

    setToken: async (token: string) => {
        await AsyncStorage.setItem('token', token);
    },

    clearToken: async () => {
        await AsyncStorage.removeItem('token');
    },
};