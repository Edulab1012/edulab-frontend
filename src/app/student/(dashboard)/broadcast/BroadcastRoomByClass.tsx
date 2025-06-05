"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import supabase from "@/utils/supabase"
import { BASE_URL } from "@/constants/baseurl"

interface ChatMessage {
    message: string
    user_name: string
    avatar: string
    timestamp: string
}

export default function BroadcastRoomByClass() {
    const [user, setUser] = useState<any>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [usersOnline, setUsersOnline] = useState<string[]>([])
    const [isSending, setIsSending] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const chatContainerRef = useRef<HTMLDivElement | null>(null)
    const [classId, setClassId] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    const fetchStudent = async () => {
        try {
            const studentId = localStorage.getItem("studentId")
            if (!studentId) throw new Error("Missing studentId in localStorage")

            const res = await axios.get(`${BASE_URL}student/${studentId}`)
            if (!res.data?.id) throw new Error("Student data incomplete")

            setUser(res.data)
            setClassId(res.data.class.id)
        } catch (err: any) {
            console.error("Failed to fetch student:", err.message)
        }
    }

    useEffect(() => {
        fetchStudent()
    }, [])



    const groupChannelId = classId ? `room-${classId}` : null

    useEffect(() => {
        if (!user || !groupChannelId) return

        const room = supabase.channel(groupChannelId, {
            config: {
                presence: { key: user.id },
            },
        })

        room.on("broadcast", { event: "message" }, (payload: { payload: ChatMessage }) => {
            setMessages((prev) => [...prev, payload.payload])
        })

        room.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await room.track({ id: user.id })
                setIsLoading(false)
            }
        })

        room.on("presence", { event: "sync" }, () => {
            const state = room.presenceState()
            setUsersOnline(Object.keys(state))
        })

        return () => {
            room.unsubscribe()
        }
    }, [user, groupChannelId])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!groupChannelId || !newMessage.trim()) return

        setIsSending(true)
        try {
            await supabase.channel(groupChannelId).send({
                type: "broadcast",
                event: "message",
                payload: {
                    message: newMessage,
                    user_name: user?.email,
                    avatar: user?.avatarUrl,
                    timestamp: new Date().toISOString(),
                },
            })
            setNewMessage("")
        } finally {
            setIsSending(false)
        }
    }

    const formatTime = (isoString: string | number | Date) => {
        return new Date(isoString).toLocaleTimeString("en-us", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }

    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: "smooth"
                })
            }
        }

        const timer = setTimeout(scrollToBottom, 100)
        return () => clearTimeout(timer)
    }, [messages])

    if (isLoading || !user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 ">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className="w-3/4 h-3/4 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
                <h2 className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700 text-center">
                    Таньд зориулсан чат бэлдэж байна...
                </h2>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">Түр хүлээнэ үү</p>
                <div className="mt-4 sm:mt-6 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-160 flex flex-col duration-500 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black px-20 pl-30">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg sm:text-xl font-bold truncate">
                            {user.className}
                        </h1>
                        <p className="text-xs sm:text-sm opacity-90 mt-1 flex items-center">
                            <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
                            <span className="truncate">{user.fullName}</span>
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
                        <p className="text-base sm:text-lg font-medium text-gray-600 text-center">✨ Ангийн найзуудтайгаа шууд чатлаарай!</p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center">🧠 Энэхүү чат нь ангийн сурагчдад зориулсан шууд дамжуулалтын орчин юм. Мессежүүд хадгалагдахгүй.</p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg?.user_name === user.email ? "justify-end" : "justify-start"} transition-all duration-200 ease-out`}
                            >
                                <div className={`flex max-w-[80%] sm:max-w-[70%] md:max-w-[60%] ${msg?.user_name === user.email ? "flex-row-reverse" : ""}`}>
                                    {msg?.user_name !== user.email && (
                                        <img
                                            src={msg.avatar}
                                            alt="avatar"
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0 object-cover border-2 border-white shadow-sm"
                                        />
                                    )}
                                    <div className={`flex flex-col ${msg?.user_name === user.email ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm shadow-sm transition-all duration-200 ${msg?.user_name === user.email
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none"
                                                : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                                                }`}
                                        >
                                            {msg.message}
                                        </div>
                                        <div className={`text-[10px] sm:text-xs mt-1 ${msg?.user_name === user.email ? "text-indigo-100" : "text-gray-500"}`}>
                                            {formatTime(msg.timestamp)}
                                        </div>
                                    </div>
                                    {msg?.user_name === user.email && (
                                        <img
                                            src={msg.avatar}
                                            alt="avatar"
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ml-2 sm:ml-3 mt-1 flex-shrink-0 object-cover border-2 border-white shadow-sm"
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
                        placeholder="Мессеж бичих..."
                        className="flex-grow p-2 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-md min-w-[40px] sm:min-w-[50px]"
                    >
                        {isSending ? (
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}