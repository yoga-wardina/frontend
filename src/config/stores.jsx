import { create } from "zustand";
import { persist } from 'zustand/middleware';


export const useStore = create(
    persist(
        (set) => ({
            isMobile: false,
            setMobile: (value) => set({ isMobile: value }),
        }),{
            name: 'counter-storage', 
        }
    )
);

export const useAuthStore = create(
    persist(
        (set)=>({
            user:[],
            isAuthenticated: false,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            checkAuth: () => set({ isAuthenticated:!!localStorage.getItem('token') }),
            login: (token) => set({ isAuthenticated: true, token: token }),
            logout: () => set({ isAuthenticated: false, token: null }),
        }),{
            name: 'auth-storage', 
        }
    )
)
export const useInputStore = create(
    (set) => ({
        error: "",
        inputs: {},
        setInput: (inputs, name, value) => set({ inputs: {...inputs, [name]: value} }),
        resetInputs: () => set({ inputs: {} }),
        setError: (error) => set({ error }),
        resetError: () => set({ error: "" }),
    })
)

