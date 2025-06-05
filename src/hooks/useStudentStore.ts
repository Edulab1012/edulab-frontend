import { create } from "zustand";

export interface Student {
    bgImage: string;
    id?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatarUrl: string;
    classId?: string;
    className?: string;
    backgroundUrl?: string;
    gender?: string
    bio?: string;
    emergencyNumber?: string;
    socials?: {
        instagram?: string;
        facebook?: string;
    };
    grade?: string;
    class?: { id?: string, name?: string, promoCode?: string };
    phoneNumber?: string;
    teacher?: string;
    user?: { username?: string }
}

interface StudentStoreState {
    student: Student | null;
    setStudent: (student: Student) => void;
    clearStudent: () => void;
}

export const useStudentStore = create<StudentStoreState>((set) => ({
    student: null,
    setStudent: (student) => set({ student }),
    clearStudent: () => set({ student: null }),
}));