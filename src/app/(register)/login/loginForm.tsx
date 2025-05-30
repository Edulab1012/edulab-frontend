"use client";

import RegisterButton from "@/components/RegisterButton";
import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<null | { type: "success" | "error"; text: string }>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await axios.post(`${BASE_URL}auth/login`, {
                email,
                password,
            });

            if (res.data.success) {
                const role = res.data.user.role;


                setMessage({ type: "success", text: "Амжилттай нэвтэрлээ!" });

                setTimeout(() => {
                    if (role === "teacher") {
                        router.push("/teacher");
                        localStorage.setItem("teacherId", res.data.user.id);
                    } else if (role === "student") {
                        localStorage.setItem("studentId", res.data.user.id);
                        router.push("/student");
                    }
                }, 1200);

            } else {
                setMessage({ type: "error", text: "Нэвтрэхэд алдаа гарлаа." });
            }
        } catch (err: any) {
            setIsLoading(false);
            setMessage({
                type: "error",
                text: err?.response?.data?.message || "Алдаа гарлаа. Дахин оролдоно уу.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-full h-screen items-center justify-center p-4 z-1 backdrop-blur-sm">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-[#2C3A4A] rounded-2xl shadow-xl overflow-hidden p-8 backdrop-blur-sm"
                >
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-light text-[#1E2636] dark:text-[#FFD3A1]">
                            ClassHero-д тавтай морил
                        </h2>
                        <p className="text-[#333] dark:text-[#EAEFEF] mt-2">Бүртгэлтэй хаягаа ашиглан нэвтэрнэ үү</p>
                    </div>

                    {message && (
                        <div
                            className={`text-center text-sm mb-4 p-2 rounded-md ${message.type === "success" ? "text-green-500" : " text-red-400"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-light text-[#333] dark:text-[#EAEFEF]">
                                Имэйл
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-[#555] dark:text-[#EAEFEF]" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E2636] border border-[#5bcfd3] rounded-lg text-[#1E2636] dark:text-[#FFD3A1] placeholder-gray-500 dark:placeholder-[#EAEFEF] focus:outline-none focus:ring-2 focus:ring-[#5bcfd3]"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-light text-[#333] dark:text-[#EAEFEF]">
                                Нууц үг
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-[#555] dark:text-[#EAEFEF]" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-white dark:bg-[#1E2636] border border-[#5bcfd3] rounded-lg text-[#1E2636] dark:text-[#FFD3A1] placeholder-gray-500 dark:placeholder-[#EAEFEF] focus:outline-none focus:ring-2 focus:ring-[#5bcfd3]"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5 text-[#555] dark:text-[#EAEFEF]" />
                                    ) : (
                                        <FiEye className="h-5 w-5 text-[#555] dark:text-[#EAEFEF]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-[#333] dark:text-[#EAEFEF]">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-[#5bcfd3] bg-white dark:bg-[#1E2636] text-[#FF9C42] focus:ring-[#FF9C42]"
                                />
                                <span className="ml-2">Сануулах</span>
                            </label>
                            <a href="#" className="text-sm text-[#555] dark:text-[#EAEFEF] hover:underline">
                                Нууц үгээ мартсан уу?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-[#e1aa77] hover:bg-[#e8ba91] transition disabled:opacity-60"
                        >
                            {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
                        </button>
                    </div>

                    {/* Register */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#333] dark:text-[#EAEFEF] flex items-center justify-center gap-6">
                            Бүртгэл байхгүй юу? <RegisterButton />
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}