import { http } from './http';

export interface User {
    id: string;
    name: string;
    email: string;
}

export const getProfileApi = async (): Promise<User> => {
    const res = await http.get('/me');
    return res.data;
};
