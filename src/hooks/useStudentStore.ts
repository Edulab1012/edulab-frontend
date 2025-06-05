import { create } from "zustand";

export interface Student {
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
    socials?: {
        instagram?: string;
        facebook?: string;
    };
    grade?: string;
    class?: string;
    phoneNumber?: string;
    teacher?: string;
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