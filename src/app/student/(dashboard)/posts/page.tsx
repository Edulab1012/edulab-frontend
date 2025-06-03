"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  user: {
    username: string;
  };
  teacher?: {
    firstName: string;
    lastName: string;
  };
  comments?: Comment[]; // Make comments optional
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
  student?: {
    firstName: string;
    lastName: string;
  };
  postId: string;
}

export default function StudentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [activePost, setActivePost] = useState<string | null>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const supabase = createClientComponentClient();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [checkClassID, setCheckClassID] = useState<string | null>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    const userId = localStorage.getItem("userId");
    setStudentId(studentId);
    setUserId(userId);

    if (!studentId) {
      router.push("/login");
      return;
    }

    const fetchStudentClass = async () => {  
      try {
        const response = await axios.get(`${BASE_URL}student/${studentId}`);
        const classId = response.data.classId;
        setCheckClassID(classId);
        if (classId) {
          await fetchPosts(classId);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        toast.error("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchStudentClass();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [router]);

  useEffect(() => {
    if (posts.length > 0 && checkClassID) {
      setupRealtime();
    }
  }, [posts, checkClassID]);

  const fetchPosts = async (classId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}posts/class/${classId}`);
      const postsWithComments = response.data.map((post: Post) => ({
        ...post,
        comments: post.comments || []
      }));
      setPosts(postsWithComments);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtime = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
          filter: `postId=in.(${posts.map((p) => p.id).join(',')})`,
        },
        (payload) => {
          const newComment = payload.new as Comment;
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.id === newComment.postId) {
                return {
                  ...post,
                  comments: [...(post.comments || []), newComment],
                };
              }
              return post;
            })
          );
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await axios.post(`${BASE_URL}posts/${postId}/comments`, {
        content: newComment,
        userId,
        studentId,
      });

      setNewComment("");
      setActivePost(null);
      // Refresh comments after adding a new one
      if (checkClassID) {
        await fetchPosts(checkClassID);
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 md:ml-64">
      <div className="mt-[80px] md:mt-[100px]">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-6">
          Class Posts
        </h1>

        {posts.length === 0 ? (
          <div
            className={`p-6 rounded-xl text-center ${
              theme === "dark" ? "bg-[#2C3A4A]" : "bg-white"
            }`}
          >
            <p className="text-gray-500 dark:text-gray-400">
              No posts available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-xl shadow-md ${
                  theme === "dark" ? "bg-[#2C3A4A]" : "bg-white"
                }`}
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === "dark" ? "bg-[#6B5AED]/20" : "bg-[#1DA1F2]/10"
                      }`}
                    >
                      <span className="text-lg">
                        {post.teacher
                          ? `${post.teacher.firstName.charAt(0)}${post.teacher.lastName.charAt(0)}`
                          : "T"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Posted by{" "}
                      {post.teacher
                        ? `${post.teacher.firstName} ${post.teacher.lastName}`
                        : post.user.username}{" "}
                      on {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
                {post.imageUrl && (
                  <div className="mb-4">
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comments ({(post.comments || []).length})
                  </h3>
                  <div className="space-y-3 mb-4">
                    {(post.comments || []).map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-lg ${
                          theme === "dark" ? "bg-[#1E293B]" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                theme === "dark"
                                  ? "bg-[#6B5AED]/20"
                                  : "bg-[#1DA1F2]/10"
                              }`}
                            >
                              <span className="text-sm">
                                {comment.student
                                  ? `${comment.student.firstName.charAt(0)}${comment.student.lastName.charAt(0)}`
                                  : "S"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {comment.student
                                ? `${comment.student.firstName} ${comment.student.lastName}`
                                : comment.user.username}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {comment.content}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {activePost === post.id ? (
                    <div className="mt-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                        rows={3}
                        className={`w-full p-2.5 rounded-lg border ${
                          theme === "dark"
                            ? "bg-[#1E293B] border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setActivePost(null)}
                          className={`px-3 py-1.5 rounded-lg text-sm ${
                            theme === "dark"
                              ? "bg-gray-700 hover:bg-gray-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm ${
                            theme === "dark"
                              ? "bg-[#6B5AED] hover:bg-[#7D6BEE] text-white"
                              : "bg-[#1DA1F2] hover:bg-[#1A91E8] text-white"
                          }`}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActivePost(post.id)}
                      className={`text-sm ${
                        theme === "dark"
                          ? "text-[#6B5AED] hover:text-[#7D6BEE]"
                          : "text-[#1DA1F2] hover:text-[#1A91E8]"
                      }`}
                    >
                      Add a comment...
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}