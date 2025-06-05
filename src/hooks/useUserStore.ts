import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    id: string
    email: string
    username?: string
    avatarUrl?: string
    classId?: string
    className?: string
}

interface UserStore {
    user: User | null
    setUser: (user: User | null) => void
    updateUser: (updates: Partial<User>) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            updateUser: (updates) => {
                const currentUser = get().user
                if (currentUser) {
                    set({ user: { ...currentUser, ...updates } })
                }
            },
            clearUser: () => set({ user: null }),
        }),
        {
            name: "user-storage",
        },
    ),
)
