export interface Student {
  classId: string | undefined;
  gender: string;
  firstName?: string;
  lastName?: string;
  grade?: string;
  class?: string
  phoneNumber?: string;
  email?: string;
  teacher?: string;
  backgroundUrl?: string
  avatarUrl?: string,
  bio?: string,
  socials?: {
    instagram?: string
    facebook?: string,
  }
}

export interface Teacher {
  // Fill later when needed
  [key: string]: any;
}

export interface ExistingUser {
  className: string;
  classId: string;
  id: string;
  username: string;
  phoneNumber: string | null;
  email: string;
  avatarUrl: string | null;
  role: "student" | "teacher";
  password: string;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  teacher?: Teacher | null;
}


export interface DecodedTokenType {
  iat: number;
  exp: number;
  existingUser: ExistingUser;
}