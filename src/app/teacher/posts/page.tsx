"use client";

import React, { useState, useEffect, use } from "react";
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

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { theme } = useTheme();

  console.log("User ID:", userId);

  console.log("Teacher ID:", userId);
  console.log(classId, "Class ID");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const teacherId = localStorage.getItem("teacherId");
    setUserId(userId);
    setTeacherId(teacherId);
    if (!teacherId) {
      router.push("/login");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}class/teacher/${teacherId}`
        );
        setClasses(response.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
        toast.error("Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
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

        setTitle("");
        setContent("");
        setImageUrl("");
        setClassId("");
      } else {
        toast.error("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
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
          Create New Post
        </h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className={`max-w-3xl mx-auto p-6 rounded-xl shadow-md ${
            theme === "dark" ? "bg-[#2C3A4A]" : "bg-white"
          }`}
        >
          <div className="mb-4">
            <label
              htmlFor="class"
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Class
            </label>
            <select
              id="class"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className={`w-full p-2.5 rounded-lg border ${
                theme === "dark"
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
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2.5 rounded-lg border ${
                theme === "dark"
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
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={`w-full p-2.5 rounded-lg border ${
                theme === "dark"
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
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Image URL (optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full p-2.5 rounded-lg border ${
                theme === "dark"
                  ? "bg-[#1E293B] border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-lg font-medium ${
                theme === "dark"
                  ? "bg-[#6B5AED] hover:bg-[#7D6BEE] text-white"
                  : "bg-[#1DA1F2] hover:bg-[#1A91E8] text-white"
              } transition-colors duration-200`}
            >
              Create Post
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
