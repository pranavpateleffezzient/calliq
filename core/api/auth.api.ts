import { http } from "./http";


export const loginApi = (data: any) =>
    http.post('/auth/login', data);