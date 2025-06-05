import { create } from "zustand";
import { persist } from "zustand/middleware"

export interface ExistingUser {
    id: string;
    username: string;
    phoneNumber: string | null;
    avatarUrl: string | null;
    email: string;
    classId: string;
    className: string;
    role: "student" | "teacher";
    password?: string
}

interface ExistingUserState {
    user: ExistingUser | null;
    setUser: (user: ExistingUser | null) => void
    updateUser: (updates: Partial<ExistingUser>) => void
    clearUser: () => void;
}

export const useExistingUserSotre = create<ExistingUserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
    })),
    clearUser: () => set({ user: null }),
}));