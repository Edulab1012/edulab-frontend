
export type User = {
  id: string;
  username: string;
  email: string;
  role: 'teacher' | 'student';
};

export type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  userId: string;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  userId: string;
  classId?: string;
};

export type Class = {
  id: string;
  name: string;
  teacherId?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  classId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
  };
  class: Class;
  comments: Comment[];
  teacher?: {
    id: string;
    userId: string;
  };
};

export type Comment = {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: string;
  user: {
    username: string;
  };
  post: {
    classId: string;
    title: string;
  };
  student?: {
    id: string;
  };
};