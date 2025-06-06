import { create } from "zustand";
import { persist } from "zustand/middleware"

export interface User {
    id: string;
    email?: string
    name?: string
    username: string;
    phoneNumber: string | null;
    avatarUrl: string | null;

    classId: string;
    className: string;
    role: "student" | "teacher";
    password?: string
}

interface ExistingUserStore {
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
}

export const useExistingUserStore = create<ExistingUserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}))
