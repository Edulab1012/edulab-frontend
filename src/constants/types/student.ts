export interface Student {
  firstName: string;
  lastName: string;
  class: string;
  grade?: string;
  phoneNumber: string;
  email: string;
  teacher: string;
  avatarUrl?: string;
  bio?: string;
  backgroundUrl?: string;
  socials: {
    instagram?: string;
    facebook?: string;
  };
}
