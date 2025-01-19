import { create } from "zustand";

const useCountStore = create((set) => ({
    isAuthenticated: false,
    login: (token) => set({ isAuthenticated: true, token }),
    logout: () => set({ isAuthenticated: false, token: null }),
    setToken: (token) => set({ token }),
}));
