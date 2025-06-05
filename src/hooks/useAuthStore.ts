import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "student" | "teacher"
  avatar?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock user data - replace with actual API call
          const mockUser: User = {
            id: "1",
            email,
            firstName: "John",
            lastName: "Doe",
            role: email.includes("teacher") ? "teacher" : "student",
          }

          set({ user: mockUser, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error("Invalid credentials")
        }
      },

      register: async (userData) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
          }

          set({ user: newUser, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error("Registration failed")
        }
      },

      logout: () => {
        set({ user: null })
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
