export interface TokenStorage {
    getToken(): Promise<string | null>;
    setToken(token: string): Promise<void>;
    clearToken(): Promise<void>;
}

let storage: TokenStorage;

export const setTokenStorage = (s: TokenStorage) => {
    storage = s;
};

export const getToken = async () => {
    if (!storage) return null;
    return storage.getToken();
};

export const setToken = async (token: string) => {
    if (!storage) return;
    await storage.setToken(token);
};

export const clearToken = async () => {
    if (!storage) return;
    await storage.clearToken();
};
