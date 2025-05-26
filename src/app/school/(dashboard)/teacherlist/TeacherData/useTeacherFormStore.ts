import { create } from "zustand";

type TeacherFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  grade: string;
  group: string;
  subject: string[];
  password: string;
  setField: (field: string, value: string) => void;
  setSubject: (subject: string[]) => void;
  reset: () => void;
};

export const useTeacherFormStore = create<TeacherFormState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  grade: "",
  group: "",
  subject: [],
  password: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  setSubject: (subject) => set({ subject }),

  reset: () =>
    set({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      grade: "",
      group: "",
      subject: [],
    }),
}));
