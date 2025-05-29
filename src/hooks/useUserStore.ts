import { User } from 'lucide-react';
import { create } from 'zustand'
import { createWithEqualityFn } from "zustand/traditional";


interface UserStore {
    id?: string
    email?: string
    fullName?: string
    avatarUrl?: string
    role?: string
    class?: string
    createdAt?: string
    updatedAt?: string
}



interface UserStoreState {
    user: UserStore | null;
    setUser: (user: UserStore) => void;
    clearUser: () => void;
    setRole: (role: string) => void;
}


export const useUserStore = createWithEqualityFn<UserStoreState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setRole: (role: string) =>
        set((state) => ({
            user: state.user ? { ...state.user, role } : { role },
        })),
}));