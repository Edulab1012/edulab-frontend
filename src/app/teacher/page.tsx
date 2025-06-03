"use client";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddClass from "./allclass/AddClass";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PanelTop, Plus } from "lucide-react";
import { useTheme } from "next-themes";

interface Class {
  id: string;
  name: string;
  promoCode?: string;
  createdAt: string;
  students: Student[];
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

export default function TeacherDashboard() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleDeleteClass = async (classId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("Та энэ ангийг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}class/${classId}`);
      setClasses(classes.filter((cls) => cls.id !== classId));
      toast.success("Анги амжилттай устгагдлаа!");
    } catch (err) {
      console.log("Error deleting class:", err);
      toast.error("Анги устгахад алдаа гарлаа");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    setTeacherId(id);
    if (!id) {
      router.push("/login");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}class/teacher/${id}`);
        setClasses(response.data);
      } catch (err) {
        setError("Ангиудыг авахад алдаа гарлаа");
        console.log("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [router]);

  const handleClassClick = (classId: string) => {
    router.push(`/teacher/class/${classId}/students`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 md:p-6 md:ml-64">
      <div className="mt-[80px] md:mt-[100px] flex flex-col jcustify-center ">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-6 md:mb-[60px] mt-6 md:mt-[60px]">
          Миний ангиуд
        </h1>

        {classes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <PanelTop className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
              Анги олдсонгүй. Шинэ анги үүсгэх үү?
            </p>
            <AddClass>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6B5AED] to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                <Plus className="w-5 h-5" />
                <span>Шинэ анги үүсгэх</span>
              </button>
            </AddClass>
          </div>
        ) : (
          <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-4 md:gap-6">
            {classes.map((cls) => (
              <motion.div
                key={cls.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[280px] h-[240px] rounded-2xl shadow-lg flex flex-col relative cursor-pointer overflow-hidden"
                onClick={() => handleClassClick(cls.id)}
              >
                <div
                  className={`absolute inset-0 ${theme === "dark"
                      ? "bg-gradient-to-br from-[#2C3A4A] to-[#1E293B]"
                      : "bg-gradient-to-br from-[#F5F6FA] to-[#E2E8F0]"
                    }`}
                />
                <div className="absolute top-3 right-3 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`p-1.5 rounded-full ${theme === "dark"
                            ? "hover:bg-[#6B5AED]/30 text-[#e1aa77]"
                            : "hover:bg-[#1DA1F2]/20 text-[#2C3A4A]"
                          } transition-colors duration-200`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={`w-48 ${theme === "dark"
                          ? "bg-[#2C3A4A] border-[#6B5AED]/30"
                          : "bg-white border-[#1DA1F2]/30"
                        } rounded-lg shadow-xl`}
                      align="end"
                      sideOffset={5}
                    >
                      <DropdownMenuLabel
                        className={`${theme === "dark"
                            ? "text-[#e1aa77]"
                            : "text-[#6B5AED] "
                          }`}
                      >
                        Ангийн тохиргоо
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator
                        className={
                          theme === "dark"
                            ? "bg-[#6B5AED]/30"
                            : "bg-[#1DA1F2]/30"
                        }
                      />
                      <DropdownMenuItem
                        className={`${theme === "dark"
                            ? "hover:bg-[#6B5AED]/20 text-white"
                            : "hover:bg-[#1DA1F2]/10 text-[#2C3A4A]"
                          } cursor-pointer`}
                        onClick={() => handleClassClick(cls.id)}
                      >
                        Ангийн мэдээлэл
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${theme === "dark"
                            ? "hover:bg-[#6B5AED]/20 text-white"
                            : "hover:bg-[#1DA1F2]/10 text-[#2C3A4A]"
                          } cursor-pointer`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Тохиргоо
                      </DropdownMenuItem>
                      <DropdownMenuSeparator
                        className={
                          theme === "dark"
                            ? "bg-[#6B5AED]/30"
                            : "bg-[#1DA1F2]/30"
                        }
                      />
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-red-500/10 cursor-pointer"
                        onClick={(e) => handleDeleteClass(cls.id, e)}
                      >
                        Анги устгах
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="relative z-0 w-full h-full flex flex-col items-center justify-center p-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === "dark"
                        ? "bg-[#6B5AED]/20 text-[#e1aa77]"
                        : "bg-[#1DA1F2]/10 text-[#6B5AED]"
                      }`}
                  >
                    <PanelTop className="w-8 h-8" />
                  </div>
                  <div className="w-full text-center">
                    <h2
                      className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-[#2C3A4A]"
                        }`}
                    >
                      {cls.name}
                    </h2>
                    <p
                      className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                        } mb-2`}
                    >
                      Үүссэн: {new Date(cls.createdAt).toLocaleDateString()}
                    </p>
                    {cls.promoCode && (
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${theme === "dark"
                            ? "bg-[#6B5AED]/30 text-[#e1aa77]"
                            : "bg-[#1DA1F2]/10 text-[#6B5AED]"
                          }`}
                      >
                        Код: {cls.promoCode}
                      </div>
                    )}
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${theme === "dark"
                        ? "bg-gradient-to-r from-[#6B5AED] to-purple-600"
                        : "bg-gradient-to-r from-[#1DA1F2] to-blue-500"
                      }`}
                  />
                </div>
              </motion.div>
            ))}
            <AddClass>
              <button className="w-full max-w-[280px] h-[240px] flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6B5AED] to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                <Plus className="w-8 h-8" />
                <span className="text-lg">Шинэ анги</span>
              </button>
            </AddClass>
          </div>
        )}
      </div>
    </div>
  );
}
