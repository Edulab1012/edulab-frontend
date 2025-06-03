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




interface UserProfile {
    name: string;
    about: string;
    image?: string;
    background?: string;
    socialmediaUrl: string;
}

interface UserDataStore {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
}

export const useUserDataStore = create<UserDataStore>((set) => ({
    profile: {
        name: "Уянга",
        about: "Ном унших, код бичих дуртай.",
        image: "/student.png",
        background: "/bg-default.jpg",
        socialmediaUrl: "https://facebook.com/uyanga.dev",
    },
    setProfile: (profile) => set({ profile }),
}));