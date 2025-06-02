import { create } from 'zustand'

interface TestUser {
    id: string
    email: string
    fullName?: string
    avatarUrl?: string
    provider?: string | null
    role?: string
    grade?: string
    group?: string
    createdAt?: string
    updatedAt?: string
}

interface TestUserState {
    user: TestUser | null
    setUser: (user: TestUser) => void
    clearUser: () => void
}

export const useTestUserStore = create<TestUserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}))