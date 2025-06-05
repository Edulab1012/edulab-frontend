import supabase from "../lib/supabase";
import { Post, Comment } from "../constants/types/post";

export const createPost = async (postData: {
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  classId: string;
}): Promise<Post> => {
  const { data, error } = await supabase
    .from("Post")
    .insert(postData)
    .select(
      `
      *,
      user:userId (username),
      class:classId (id, name, teacher:teacherId (userId))
    `
    )
    .single();

  if (error) throw error;
  return data;
};

export const getClassPosts = async (classId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("Post")
    .select(
      `
      *,
      user:userId (username),
      class:classId (id, name, teacher:teacherId (userId)),
      comments:Comment (
        *,
        user:userId (username),
        student:studentId (id)
      )
    `
    )
    .eq("classId", classId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data;
};

export const createComment = async (commentData: {
  content: string;
  postId: string;
  userId: string;
  studentId?: string;
}): Promise<Comment> => {
  const { data, error } = await supabase
    .from("Comment")
    .insert(commentData)
    .select(
      `
      *,
      user:userId (username),
      post:postId (classId, title),
      student:studentId (id)
    `
    )
    .single();

  if (error) throw error;
  return data;
};

export const deletePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  const { error } = await supabase.from("Post").delete().eq("id", postId);

  if (error) throw error;
};
