"use client";

import RegisterButton from "@/components/RegisterButton";
import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { BookCheck, PanelTop, Backpack } from "lucide-react";
import RegisterLoginwithGoogle from "../googleRegister";

export default function LoginForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);
  const [res, setRes] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(`${BASE_URL}auth/login`, {
        email,
        password,
      });

      console.log(res);

      if (res.status == 200) {
        const role = res.data.user.role;
        setRes(res.data.user.teacherId);

        setMessage({ type: "success", text: "Амжилттай нэвтэрлээ!" });

        setTimeout(() => {
          if (role === "teacher") {
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("teacherId", res.data.teacher.id);
            localStorage.setItem("token", res.data.token)

            router.push("/teacher");

          } else if (role === "student") {
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("studentId", res.data.student.id);
            localStorage.setItem("token", res.data.token)
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
        text:
          err?.response?.data?.message || "Алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex w-full h-screen items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-3xl border-r-4 shadow-xl transition-all duration-200 ${theme === "dark"
          ? "bg-[#121220] border-r-[#6B5AED]"
          : "bg-[#F5F6FA] border-r-[#1DA1F2]"
          }`}
      >
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-center gap-4 mb-6">
            <div
              className={`p-3 rounded-xl ${theme === "dark"
                ? "bg-[#6B5AED] text-white"
                : "bg-[#1DA1F2] text-white"
                } shadow-md`}
            >
              <BookCheck className="w-6 h-6" />
            </div>
            <div
              className={`p-3 rounded-xl ${theme === "dark"
                ? "bg-[#6B5AED] text-white"
                : "bg-[#1DA1F2] text-white"
                } shadow-md`}
            >
              <PanelTop className="w-6 h-6" />
            </div>
            <div
              className={`p-3 rounded-xl ${theme === "dark"
                ? "bg-[#6B5AED] text-white"
                : "bg-[#1DA1F2] text-white"
                } shadow-md`}
            >
              <Backpack className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2
              className={`text-3xl font-light ${theme === "dark" ? "text-white" : "text-gray-800"
                }`}
            >
              ClassHero-д тавтай морил
            </h2>
            <p
              className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Бүртгэлтэй хаягаа ашиглан нэвтэрнэ үү
            </p>
          </div>

          {message && (
            <div
              className={`text-center text-sm mb-4 p-2 rounded-md ${message.type === "success"
                ? "bg-green-500/20 text-green-500"
                : "bg-red-500/20 text-red-400"
                }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-light ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Имэйл
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser
                    className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${theme === "dark" ? "bg-[#1E1E2D]" : "bg-white"
                    } border ${theme === "dark"
                      ? "border-[#6B5AED]/50"
                      : "border-[#1DA1F2]/50"
                    } rounded-lg ${theme === "dark" ? "text-white" : "text-gray-800"
                    } placeholder-${theme === "dark" ? "gray-500" : "gray-400"
                    } focus:outline-none focus:ring-2 ${theme === "dark"
                      ? "focus:ring-[#6B5AED]"
                      : "focus:ring-[#1DA1F2]"
                    }`}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className={`block text-sm font-light ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Нууц үг
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock
                    className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                  />
                </div>
                <input
                  id="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 ${theme === "dark" ? "bg-[#1E1E2D]" : "bg-white"
                    } border ${theme === "dark"
                      ? "border-[#6B5AED]/50"
                      : "border-[#1DA1F2]/50"
                    } rounded-lg ${theme === "dark" ? "text-white" : "text-gray-800"
                    } placeholder-${theme === "dark" ? "gray-500" : "gray-400"
                    } focus:outline-none focus:ring-2 ${theme === "dark"
                      ? "focus:ring-[#6B5AED]"
                      : "focus:ring-[#1DA1F2]"
                    }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff
                      className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                    />
                  ) : (
                    <FiEye
                      className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label
                className={`flex items-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                <input
                  type="checkbox"
                  className={`h-4 w-4 rounded border ${theme === "dark"
                    ? "border-[#6B5AED] bg-[#1E1E2D] text-[#6B5AED]"
                    : "border-[#1DA1F2] bg-white text-[#1DA1F2]"
                    } focus:ring-${theme === "dark" ? "[#6B5AED]" : "[#1DA1F2]"}`}
                />
                <span className="ml-2">Сануулах</span>
              </label>
              <a
                href="#"
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                  } hover:underline hover:${theme === "dark" ? "text-[#6B5AED]" : "text-[#1DA1F2]"
                  }`}
              >
                Нууц үгээ мартсан уу?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-sm font-medium text-white ${theme === "dark" ? "bg-[#6B5AED]" : "bg-[#1DA1F2]"
                } hover:${theme === "dark" ? "bg-[#7C6BED]" : "bg-[#2DA1F2]"
                } transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60`}
            >
              {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>
          </div>

          {/* Register */}
          <div className="mt-6 text-center">
            <p
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                } flex items-center justify-center gap-2`}
            >
              Бүртгэл байхгүй юу?{" "}
              <span className="inline-block">
                <RegisterButton />
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
