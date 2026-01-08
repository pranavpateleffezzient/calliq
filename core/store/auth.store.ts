import { create } from 'zustand';

interface AuthState {
    user: any | null;
    isLoggedIn: boolean;
    setUser: (u: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) =>
        set({ user, isLoggedIn: true }),
    logout: () =>
        set({ user: null, isLoggedIn: false }),
}));