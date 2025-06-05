"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "../../../constants/baseurl";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiCheckCircle } from "react-icons/fi";

interface Class {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  user: {
    username: string;
    id: string;
  };
  teacher?: {
    firstName: string;
    lastName: string;
    id: string;
  };
  class: {
    id: string;
    name: string;
  };
  comments?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
    id: string;
  };
  student?: {
    firstName: string;
    lastName: string;
    id: string;
  };
  postId: string;
  userId: string;
  studentId?: string;
}

export default function TeacherPosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [teacherPosts, setTeacherPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "view">("create");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const teacherId = localStorage.getItem("teacherId");
    setUserId(userId);
    setTeacherId(teacherId);

    if (!teacherId) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch classes
        const classesResponse = await axios.get(
          `${BASE_URL}class/teacher/${teacherId}`
        );
        setClasses(classesResponse.data);

        // Fetch teacher's posts
        const postsResponse = await axios.get(
          `${BASE_URL}posts/teacher/${teacherId}`
        );
        setTeacherPosts(postsResponse.data);
      } catch (err) {
        console.log("Error fetching data:", err);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
        setPostsLoading(false);
      }
    };

    fetchData();
  }, [router, teacherId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !classId) {
      toast.error("Title, content, and class are required");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}posts`, {
        title,
        content,
        imageUrl: imageUrl || null,
        classId,
        userId,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Post created successfully!", {
          icon: <FiCheckCircle className="text-green-500" />,
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
          },
        });

        // Refresh the posts list
        const postsResponse = await axios.get(
          `${BASE_URL}posts/teacher/${teacherId}`
        );
        setTeacherPosts(postsResponse.data);

        // Reset form
        setTitle("");
        setContent("");
        setImageUrl("");
        setClassId("");

        // Switch to view tab
        setActiveTab("view");
      } else {
        toast.error("Failed to create post");
      }
    } catch (err) {
      console.log("Error creating post:", err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to create post");
      } else {
        toast.error("Failed to create post");
      }
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
          Teacher Posts
        </h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("create")}
            className={`py-2 px-4 font-medium text-sm ${activeTab === "create"
                ? "text-[#6B5AED] dark:text-[#7D6BEE] border-b-2 border-[#6B5AED] dark:border-[#7D6BEE]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            Create Post
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`py-2 px-4 font-medium text-sm ${activeTab === "view"
                ? "text-[#6B5AED] dark:text-[#7D6BEE] border-b-2 border-[#6B5AED] dark:border-[#7D6BEE]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            View Posts
          </button>
        </div>

        {activeTab === "create" ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className={`max-w-3xl mx-auto p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-[#2C3A4A]" : "bg-white"
              }`}
          >
            <div className="mb-4">
              <label
                htmlFor="class"
                className={`block mb-2 text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                Class
              </label>
              <select
                id="class"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className={`w-full p-2.5 rounded-lg border ${theme === "dark"
                    ? "bg-[#1E293B] border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                  }`}
                required
              >
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className={`block mb-2 text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2.5 rounded-lg border ${theme === "dark"
                    ? "bg-[#1E293B] border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="Post title"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className={`block mb-2 text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className={`w-full p-2.5 rounded-lg border ${theme === "dark"
                    ? "bg-[#1E293B] border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="Write your post content here..."
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label
                htmlFor="imageUrl"
                className={`block mb-2 text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                Image URL (optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`w-full p-2.5 rounded-lg border ${theme === "dark"
                    ? "bg-[#1E293B] border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                  }`}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-lg font-medium ${theme === "dark"
                    ? "bg-[#6B5AED] hover:bg-[#7D6BEE] text-white"
                    : "bg-[#1DA1F2] hover:bg-[#1A91E8] text-white"
                  } transition-colors duration-200`}
              >
                Create Post
              </button>
            </div>
          </motion.form>
        ) : (
          <div className="space-y-6">
            {postsLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : teacherPosts.length === 0 ? (
              <div
                className={`p-6 rounded-xl text-center ${theme === "dark" ? "bg-[#2C3A4A]" : "bg-white"
                  }`}
              >
                <p className="text-gray-500 dark:text-gray-400">
                  You haven't created any posts yet.
                </p>
              </div>
            ) : (
              teacherPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-[#2C3A4A]" : "bg-white"
                    }`}
                >
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === "dark"
                            ? "bg-[#6B5AED]/20"
                            : "bg-[#1DA1F2]/10"
                          }`}
                      >
                        <span className="text-lg">
                          {post.teacher
                            ? `${post.teacher.firstName.charAt(
                              0
                            )}${post.teacher.lastName.charAt(0)}`
                            : "T"}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Posted in {post.class.name} on{" "}
                        {new Date(post.createdAt).toLocaleString()}
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
                          className={`p-3 rounded-lg ${theme === "dark" ? "bg-[#1E293B]" : "bg-gray-50"
                            }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "dark"
                                    ? "bg-[#6B5AED]/20"
                                    : "bg-[#1DA1F2]/10"
                                  }`}
                              >
                                <span className="text-sm">
                                  {comment.student
                                    ? `${comment.student.firstName.charAt(
                                      0
                                    )}${comment.student.lastName.charAt(0)}`
                                    : "S"}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3 flex-1">
                              <div>
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
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
