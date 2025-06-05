"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import supabase, {
  hasValidCredentials,
  testSupabaseConnection,
} from "@/lib/supabase";
import { useUserStore } from "@/hooks/useUserStore";

interface ChatMessage {
  id: string;
  message: string;
  user_name: string;
  avatar_url: string | null;
  created_at: string;
  user_id: string;
  chat_room_id: string;
}

export default function BroadcastRoomByClass() {
  const { user, setUser } = useUserStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "failed" | "demo"
  >("connecting");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const groupChannelId = user?.classId ?? "default-class";

  // Initialize user if not available
  useEffect(() => {
    if (!user) {
      setUser({
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email: "student@edulab.com",
        username: "Student User",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        classId: "class-" + Math.random().toString(36).substr(2, 9),
        className: "Demo Class",
      });
    }
  }, [user, setUser]);

  // Test Supabase connection
  useEffect(() => {
    const checkConnection = async () => {
      if (!hasValidCredentials) {
        console.log("⚠️ Running in demo mode - Supabase not configured");
        setConnectionStatus("demo");
        setError("Demo mode: Please configure your Supabase credentials");

        // Add some demo messages
        setMessages([
          {
            id: "demo-1",
            message: "Welcome to the class chat! 👋",
            user_name: "Demo User",
            avatar_url: "/placeholder.svg?height=40&width=40",
            created_at: new Date(Date.now() - 300000).toISOString(),
            user_id: "demo-1",
            chat_room_id: groupChannelId,
          },
          {
            id: "demo-2",
            message:
              "This is a demo message. Configure Supabase to enable real chat functionality.",
            user_name: "System",
            avatar_url: "/placeholder.svg?height=40&width=40",
            created_at: new Date(Date.now() - 120000).toISOString(),
            user_id: "demo-2",
            chat_room_id: groupChannelId,
          },
        ]);
        setIsLoading(false);
        return;
      }

      const result = await testSupabaseConnection();
      if (result.success) {
        setConnectionStatus("connected");
        setError(null);
      } else {
        setConnectionStatus("failed");
        setError(result.error || "Connection failed");
      }
    };

    checkConnection();
  }, [groupChannelId]);

  // Fetch messages and set up real-time subscription
  useEffect(() => {
    if (!user || !groupChannelId || connectionStatus !== "connected") {
      setIsLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        setError(null);
        console.log("🔍 Fetching messages for room:", groupChannelId);

        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("chat_room_id", groupChannelId)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("❌ Error fetching messages:", error);
          setError(`Failed to load messages: ${error.message}`);
        } else {
          console.log("✅ Messages fetched successfully:", data?.length || 0);
          setMessages(data || []);
        }
      } catch (err) {
        console.error("🌐 Network error:", err);
        setError("Network error: Please check your connection");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription
    console.log(
      "🔔 Setting up real-time subscription for room:",
      groupChannelId
    );
    const channel = supabase
      .channel(`room-messages-${groupChannelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_room_id=eq.${groupChannelId}`,
        },
        (payload: any) => {
          console.log("📨 New message received:", payload.new);
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe((status: any) => {
        console.log("📡 Subscription status:", status);
      });

    return () => {
      console.log("🔌 Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, [user, groupChannelId, connectionStatus]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupChannelId || !newMessage.trim() || !user) return;

    setIsSending(true);
    setError(null);

    const messageData = {
      chat_room_id: groupChannelId,
      user_id: user.id,
      user_name: user.username || user.email,
      avatar_url: user.avatarUrl || null,
      message: newMessage.trim(),
    };

    console.log("📤 Sending message:", messageData);

    if (connectionStatus === "demo") {
      // Demo mode - just add message locally
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `demo-${Date.now()}`,
            ...messageData,
            created_at: new Date().toISOString(),
          } as ChatMessage,
        ]);
        setNewMessage("");
        setIsSending(false);
      }, 500);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert(messageData)
        .select();

      if (error) {
        console.error("❌ Error sending message:", error);
        setError(`Failed to send message: ${error.message}`);
      } else {
        console.log("✅ Message sent successfully:", data);
        setNewMessage("");
      }
    } catch (err) {
      console.error("🌐 Network error:", err);
      setError("Network error while sending");
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
<<<<<<< HEAD
        <div className="w-full h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 sm:px-20 py-5">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg sm:text-xl font-light truncate">{user?.className || "Class Chat"}</h1>
                        <p className="text-xs sm:text-sm opacity-90 mt-1 flex items-center">
                            <span
                                className={`w-2 h-2 rounded-full mr-2 animate-pulse ${connectionStatus === "connected"
                                    ? "bg-green-300"
                                    : connectionStatus === "demo"
                                        ? "bg-yellow-300"
                                        : "bg-red-300"
                                    }`}
                            ></span>
                            <span className="truncate">{user?.username || user?.email}</span>
                            <span className="ml-2 text-xs">({connectionStatus === "demo" ? "Demo Mode" : connectionStatus})</span>
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                        <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-white/20 text-white rounded-full text-xs sm:text-sm backdrop-blur-sm">
                            <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
                            Онлайн: <span className="font-semibold ml-1">{usersOnline.length}</span> сурагч
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Mode Notice */}
            {connectionStatus === "demo" && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mx-4 my-2">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <span className="text-sm font-medium">Demo Mode Active</span>
                            <p className="text-xs mt-1">
                                Configure your Supabase credentials in environment variables to enable real-time chat.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && connectionStatus !== "demo" && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-2">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-4 bg-white/50 backdrop-blur-sm">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                        <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-4 sm:p-6 rounded-full mb-3 sm:mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <p className="text-base sm:text-lg font-medium text-gray-600 text-center">
                            ✨ Ангийн найзуудтайгаа шууд чатлаарай!
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center">
                            🧠 Энэхүү чат нь ангийн сурагчдад зориулсан шууд дамжуулалтын орчин юм.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.user_name === user?.username || msg.user_name === user?.email ? "justify-end" : "justify-start"
                                    } transition-all duration-200 ease-out`}
                            >
                                <div
                                    className={`flex max-w-[80%] sm:max-w-[70%] md:max-w-[60%] ${msg.user_name === user?.username || msg.user_name === user?.email ? "flex-row-reverse" : ""
                                        }`}
                                >
                                    {msg.user_name !== user?.username && msg.user_name !== user?.email && (
                                        <img
                                            src={msg.avatar_url || "/placeholder.svg?height=40&width=40"}
                                            alt="avatar"
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0 object-cover border-2 border-white shadow-sm"
                                            onError={(e) => {
                                                ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                                            }}
                                        />
                                    )}
                                    <div
                                        className={`flex flex-col ${msg.user_name === user?.username || msg.user_name === user?.email ? "items-end" : "items-start"
                                            }`}
                                    >
                                        <div
                                            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm shadow-sm transition-all duration-200 ${msg.user_name === user?.username || msg.user_name === user?.email
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none"
                                                : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                                                }`}
                                        >
                                            {msg.message}
                                        </div>
                                        <div
                                            className={`text-[10px] sm:text-xs mt-1 ${msg.user_name === user?.username || msg.user_name === user?.email
                                                ? "text-indigo-100"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            {formatTime(msg.created_at)}
                                        </div>
                                    </div>
                                    {(msg.user_name === user?.username || msg.user_name === user?.email) && (
                                        <img
                                            src={msg.avatar_url || "/placeholder.svg?height=40&width=40"}
                                            alt="avatar"
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ml-2 sm:ml-3 mt-1 flex-shrink-0 object-cover border-2 border-white shadow-sm"
                                            onError={(e) => {
                                                ; (e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input */}
            <form
                onSubmit={sendMessage}
                className="bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-b-2xl shadow-md border-t border-gray-100"
=======
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-3/4 h-3/4 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
>>>>>>> 01a501c082f5a269b823f180cede39345d5eb3db
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700 text-center">
          Таньд зориулсан чат бэлдэж байна...
        </h2>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">
          Түр хүлээнэ үү
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 sm:px-20 py-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-light truncate">
              {user?.className || "Class Chat"}
            </h1>
            <p className="text-xs sm:text-sm opacity-90 mt-1 flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                  connectionStatus === "connected"
                    ? "bg-green-300"
                    : connectionStatus === "demo"
                    ? "bg-yellow-300"
                    : "bg-red-300"
                }`}
              ></span>
              <span className="truncate">{user?.username || user?.email}</span>
              <span className="ml-2 text-xs">
                ({connectionStatus === "demo" ? "Demo Mode" : connectionStatus})
              </span>
            </p>
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-4">
            <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 bg-white/20 text-white rounded-full text-xs sm:text-sm backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
              Онлайн:{" "}
              <span className="font-semibold ml-1">{usersOnline.length}</span>{" "}
              сурагч
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Notice */}
      {connectionStatus === "demo" && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mx-4 my-2">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <span className="text-sm font-medium">Demo Mode Active</span>
              <p className="text-xs mt-1">
                Configure your Supabase credentials in environment variables to
                enable real-time chat.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && connectionStatus !== "demo" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-2">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 bg-white/50 backdrop-blur-sm"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-4 sm:p-6 rounded-full mb-3 sm:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-base sm:text-lg font-medium text-gray-600 text-center">
              ✨ Ангийн найзуудтайгаа шууд чатлаарай!
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center">
              🧠 Энэхүү чат нь ангийн сурагчдад зориулсан шууд дамжуулалтын
              орчин юм.
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user_name === user?.username ||
                  msg.user_name === user?.email
                    ? "justify-end"
                    : "justify-start"
                } transition-all duration-200 ease-out`}
              >
                <div
                  className={`flex max-w-[80%] sm:max-w-[70%] md:max-w-[60%] ${
                    msg.user_name === user?.username ||
                    msg.user_name === user?.email
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  {msg.user_name !== user?.username &&
                    msg.user_name !== user?.email && (
                      <img
                        src={
                          msg.avatar_url ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt="avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0 object-cover border-2 border-white shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg?height=40&width=40";
                        }}
                      />
                    )}
                  <div
                    className={`flex flex-col ${
                      msg.user_name === user?.username ||
                      msg.user_name === user?.email
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm shadow-sm transition-all duration-200 ${
                        msg.user_name === user?.username ||
                        msg.user_name === user?.email
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <div
                      className={`text-[10px] sm:text-xs mt-1 ${
                        msg.user_name === user?.username ||
                        msg.user_name === user?.email
                          ? "text-indigo-100"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(msg.created_at)}
                    </div>
                  </div>
                  {(msg.user_name === user?.username ||
                    msg.user_name === user?.email) && (
                    <img
                      src={
                        msg.avatar_url || "/placeholder.svg?height=40&width=40"
                      }
                      alt="avatar"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ml-2 sm:ml-3 mt-1 flex-shrink-0 object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder.svg?height=40&width=40";
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-b-2xl shadow-md border-t border-gray-100"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={
              connectionStatus === "demo"
                ? "Type a demo message..."
                : "Мессеж бичих..."
            }
            className="flex-grow p-2 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-800"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-md min-w-[40px] sm:min-w-[50px]"
          >
            {isSending ? (
              <svg
                className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
