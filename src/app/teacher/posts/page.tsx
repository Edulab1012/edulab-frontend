"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "../../../constants/baseurl";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  FiMessageSquare,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiSend,
  FiClock,
  FiCheckCircle,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    avatarUrl?: string;
  };
  teacher?: {
    firstName: string;
    lastName: string;
    id: string;
    avatarUrl?: string;
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
    avatarUrl?: string;
  };
  student?: {
    firstName: string;
    lastName: string;
    id: string;
    avatarUrl?: string;
  };
  postId: string;
  userId: string;
  studentId?: string;
}

export default function TeacherPosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [teacherPosts, setTeacherPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "view">("create");
  const [newComment, setNewComment] = useState("");
  const [activePost, setActivePost] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<{
    id: string | null;
    content: string;
  }>({ id: null, content: "" });
  const router = useRouter();
  const { theme } = useTheme();
  const supabase = createClientComponentClient();
  const channelRef = useRef<any>(null);
  const commentEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when comments are added
  useEffect(() => {
    if (commentEndRef.current) {
      commentEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [teacherPosts, activePost]);

  const PostSkeleton = () => (
    <div
      className={`p-6 rounded-xl shadow-md ${
        theme === "dark" ? "bg-[#3a2bac]" : "bg-white"
      }`}
    >
      <div className="flex items-start mb-4">
        <Skeleton circle width={40} height={40} />
        <div className="ml-4 flex-1">
          <Skeleton width={200} height={20} />
          <Skeleton width={150} height={16} className="mt-2" />
        </div>
      </div>
      <Skeleton count={3} />
      <div className="mt-4">
        <Skeleton width={100} height={16} />
        <div className="mt-3">
          <Skeleton height={60} />
        </div>
      </div>
    </div>
  );

  const Avatar = ({
    name,
    isTeacher = false,
    avatarUrl,
  }: {
    name: string;
    isTeacher?: boolean;
    avatarUrl?: string;
  }) => {
    if (avatarUrl) {
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          theme === "dark"
            ? isTeacher
              ? "bg-purple-600/20"
              : "bg-blue-600/20"
            : isTeacher
            ? "bg-purple-100"
            : "bg-blue-100"
        }`}
      >
        <span
          className={`font-medium ${
            theme === "dark"
              ? isTeacher
                ? "text-purple-300"
                : "text-blue-300"
              : isTeacher
              ? "text-purple-600"
              : "text-blue-600"
          }`}
        >
          {name
            .split(" ")
            .map((n) => n.charAt(0))
            .join("")}
        </span>
      </div>
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      // Ensure the bucket exists
      const { data: buckets, error: bucketError } =
        await supabase.storage.listBuckets();
      if (bucketError) throw bucketError;

      const bucketExists = buckets.some(
        (bucket) => bucket.name === "post-images"
      );
      if (!bucketExists) {
        const { error: createError } = await supabase.storage.createBucket(
          "post-images",
          {
            public: true,
            allowedMimeTypes: ["image/*"],
          }
        );
        if (createError) throw createError;
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(filePath, imageFile);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = await supabase.storage.from("post-images").getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const CommentActions = ({ comment }: { comment: Comment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Comment actions"
        >
          {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-1 w-32 rounded-md shadow-lg z-10 ${
                theme === "dark" ? "bg-[#1E293B]" : "bg-white"
              } border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    startEditing(comment);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiEdit2 className="mr-2" size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteComment(comment.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiTrash2 className="mr-2" size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editingComment.content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await axios.put(`${BASE_URL}posts/comments/${commentId}`, {
        content: editingComment.content,
      });

      setEditingComment({ id: null, content: "" });
      toast.success("Comment updated successfully");
      fetchTeacherPosts();
    } catch (err) {
      console.error("Error updating comment:", err);
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}posts/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      fetchTeacherPosts();
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment");
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingComment({ id: comment.id, content: comment.content });
  };

  const fetchTeacherPosts = async () => {
    try {
      if (!teacherId) return;

      const postsResponse = await axios.get(
        `${BASE_URL}posts/teacher/${teacherId}`
      );
      setTeacherPosts(postsResponse.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to fetch posts");
    } finally {
      setPostsLoading(false);
    }
  };

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
        await fetchTeacherPosts();
      } catch (err) {
        console.log("Error fetching data:", err);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, teacherId]);

  useEffect(() => {
    if (teacherPosts.length > 0 && teacherId) {
      setupRealtime();
    }
  }, [teacherPosts, teacherId]);

  const setupRealtime = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Comment",
          filter: `postId=in.(${teacherPosts.map((p) => p.id).join(",")})`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newComment = payload.new as Comment;
            setTeacherPosts((prevPosts) =>
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
            toast.success("New comment added");
          } else if (payload.eventType === "UPDATE") {
            const updatedComment = payload.new as Comment;
            setTeacherPosts((prevPosts) =>
              prevPosts.map((post) => {
                if (post.id === updatedComment.postId) {
                  return {
                    ...post,
                    comments: (post.comments || []).map((comment) =>
                      comment.id === updatedComment.id
                        ? updatedComment
                        : comment
                    ),
                  };
                }
                return post;
              })
            );
          } else if (payload.eventType === "DELETE") {
            const deletedCommentId = payload.old.id;
            setTeacherPosts((prevPosts) =>
              prevPosts.map((post) => ({
                ...post,
                comments: (post.comments || []).filter(
                  (comment) => comment.id !== deletedCommentId
                ),
              }))
            );
          }
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
      });

      setNewComment("");
      setActivePost(null);
      toast.success("Comment added successfully");
      fetchTeacherPosts();
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !classId) {
      toast.error("Title, content, and class are required");
      return;
    }

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const response = await axios.post(`${BASE_URL}posts`, {
        title,
        content,
        imageUrl,
        classId,
        userId,
        teacherId,
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
        await fetchTeacherPosts();

        // Reset form
        setTitle("");
        setContent("");
        setImageFile(null);
        setImagePreview(null);
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
      <div className="p-4 md:p-6 md:ml-64 bg-gradient-to-br from-[#F5F6FA] to-[#E0E7FF] dark:from-[#121220] dark:to-[#1E1B4B] min-h-screen">
        <div className="mt-[80px] md:mt-[100px] space-y-6">
          <Skeleton width={200} height={32} className="mb-6" />
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 md:ml-64 bg-gradient-to-br from-[#F5F6FA] to-[#E0E7FF] dark:from-[#121220] dark:to-[#1E1B4B] min-h-screen">
      <div className="mt-[80px] md:mt-[100px]">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-700 dark:text-white mb-6 flex items-center"
        >
          <FiMessageSquare className="mr-2" />
          Миний нийтлэлүүд
        </motion.h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("create")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "create"
                ? "text-[#6B5AED] dark:text-[#7D6BEE] border-b-2 border-[#6B5AED] dark:border-[#7D6BEE]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FiEdit2 className="mr-2" /> Нийтлэл үүсгэх
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "view"
                ? "text-[#6B5AED] dark:text-[#7D6BEE] border-b-2 border-[#6B5AED] dark:border-[#7D6BEE]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FiMessageSquare className="mr-2" /> Нийтлэлүүд харах
          </button>
        </div>

        {activeTab === "create" ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className={`max-w-3xl mx-auto p-6 rounded-xl shadow-md ${
              theme === "dark" ? "bg-[#3a2bac]" : "bg-white"
            }`}
          >
            <div className="mb-4">
              <label
                htmlFor="class"
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Анги
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
                <option value="">Ангиа сонгох</option>
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
                Гарчиг
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
                Агуулга
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
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Зураг оруулах
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-full p-4 border-2 border-dashed rounded-lg cursor-pointer ${
                  theme === "dark"
                    ? "border-gray-600 hover:border-gray-500"
                    : "border-gray-300 hover:border-gray-400"
                } transition-colors`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <FiUpload className="text-gray-400 mb-2" size={24} />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Зураг оруулахыг хүсвэл энд дарна уу
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-lg font-medium text-white ${
                  theme === "dark"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-purple-500 hover:bg-purple-600"
                } transition-colors flex items-center`}
              >
                <FiCheckCircle className="mr-2" /> Нийтлэл үүсгэх
              </button>
            </div>
          </motion.form>
        ) : (
          <div className="space-y-6">
            {postsLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <PostSkeleton key={i} />
                ))}
              </div>
            ) : teacherPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 rounded-xl text-center shadow-sm ${
                  theme === "dark" ? "bg-[#3a2bac]" : "bg-white"
                }`}
              >
                <div className="flex flex-col items-center justify-center py-12">
                  <FiMessageSquare size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Нийтлэл хараахан байхгүй байна.
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 mt-2">
                    Нийтлэл үүсгэх дээр дарж анхны нийтлэлэлээ үүсгэнэ үү.
                  </p>
                </div>
              </motion.div>
            ) : (
              teacherPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-xl shadow-md ${
                    theme === "dark" ? "bg-[#3a2bac]" : "bg-white"
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <Avatar
                      name={
                        post.teacher
                          ? `${post.teacher.firstName} ${post.teacher.lastName}`
                          : post.user.username
                      }
                      isTeacher={!!post.teacher}
                      avatarUrl={post.teacher?.avatarUrl || post.user.avatarUrl}
                    />

                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Posted in {post.class.name} •{" "}
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {post.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt="Post"
                        className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}

                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">
                        <FiMessageSquare className="inline mr-2" />
                        Сэтгэгдлүүд ({(post.comments || []).length})
                      </h3>
                      <button
                        onClick={() =>
                          setActivePost(activePost === post.id ? null : post.id)
                        }
                        className={`text-sm flex items-center ${
                          theme === "dark"
                            ? "text-purple-300 hover:text-purple-200"
                            : "text-purple-600 hover:text-purple-800"
                        } transition-colors`}
                      >
                        {activePost === post.id ? (
                          <>
                            <FiX className="mr-1" /> Хаах
                          </>
                        ) : (
                          <>
                            <FiEdit2 className="mr-1" /> Сэтгэгдэл үлдээх
                          </>
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {activePost === post.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mb-4 overflow-hidden"
                        >
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                            rows={3}
                            className={`w-full p-3 rounded-lg border ${
                              theme === "dark"
                                ? "bg-[#1E293B] border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setActivePost(null)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                theme === "dark"
                                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              } transition-colors`}
                            >
                              Цуцлах
                            </button>
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                                theme === "dark"
                                  ? "bg-purple-600 hover:bg-purple-700"
                                  : "bg-purple-500 hover:bg-purple-600"
                              } transition-colors flex items-center`}
                            >
                              <FiSend className="mr-1" /> Илгээх
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      <AnimatePresence>
                        {(post.comments || []).length === 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-4 text-center rounded-lg ${
                              theme === "dark" ? "bg-[#1E293B]" : "bg-gray-50"
                            }`}
                          >
                            <p className="text-gray-500 dark:text-gray-400">
                              Сэтгэгдэл байхгүй байна
                            </p>
                          </motion.div>
                        ) : (
                          (post.comments || []).map((comment) => (
                            <motion.div
                              key={comment.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className={`p-3 rounded-lg ${
                                theme === "dark" ? "bg-[#1E293B]" : "bg-gray-50"
                              }`}
                            >
                              <div className="flex items-start">
                                <Avatar
                                  name={
                                    comment.student
                                      ? `${comment.student.firstName} ${comment.student.lastName}`
                                      : comment.user.username
                                  }
                                  avatarUrl={
                                    comment.student?.avatarUrl ||
                                    comment.user.avatarUrl
                                  }
                                />
                                <div className="ml-3 flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                        {comment.student
                                          ? `${comment.student.firstName} ${comment.student.lastName}`
                                          : comment.user.username}
                                      </p>
                                      {editingComment.id === comment.id ? (
                                        <div className="mt-1">
                                          <textarea
                                            value={editingComment.content}
                                            onChange={(e) =>
                                              setEditingComment({
                                                ...editingComment,
                                                content: e.target.value,
                                              })
                                            }
                                            rows={2}
                                            className={`w-full p-2 rounded-lg border ${
                                              theme === "dark"
                                                ? "bg-[#1E293B] border-gray-600 text-white"
                                                : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                            autoFocus
                                          />
                                          <div className="flex justify-end space-x-2 mt-2">
                                            <button
                                              onClick={() =>
                                                setEditingComment({
                                                  id: null,
                                                  content: "",
                                                })
                                              }
                                              className={`px-3 py-1 rounded-lg text-xs ${
                                                theme === "dark"
                                                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                                                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                              } transition-colors`}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleUpdateComment(comment.id)
                                              }
                                              className={`px-3 py-1 rounded-lg text-xs text-white ${
                                                theme === "dark"
                                                  ? "bg-green-600 hover:bg-green-700"
                                                  : "bg-green-500 hover:bg-green-600"
                                              } transition-colors flex items-center`}
                                            >
                                              <FiCheck className="mr-1" />{" "}
                                              Хадгалах
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {comment.content}
                                          </p>
                                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-500">
                                            <FiClock className="mr-1" />
                                            {new Date(
                                              comment.createdAt
                                            ).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    {(comment.userId === userId ||
                                      (comment.studentId &&
                                        comment.studentId === userId)) && (
                                      <CommentActions comment={comment} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                      <div ref={commentEndRef} />
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
