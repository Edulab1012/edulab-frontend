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
import Image from "next/image";

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
  const teacherId = localStorage.getItem("teacherId");

  const handleDeleteClass = async (classId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("Та энэ ангийг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}class/${classId}`);
      // Remove the deleted class from state
      setClasses(classes.filter((cls) => cls.id !== classId));
      toast.success("Анги амжилттай устгагдлаа!");
    } catch (err) {
      console.error("Error deleting class:", err);
      toast.error("Анги устгахад алдаа гарлаа");
    }
  };

  useEffect(() => {
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
        setError("Ангиудыг авахад алдаа гарлаа");
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [teacherId, router]);

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
    <div className="flex flex-col justify-center items-center lg:items-start p-4 md:p-6 md:ml-64">
      <div className="mt-[100px]">
        <h1 className="text-xl font-bold mb-4 text-gray-700 dark:text-[#e1aa77]">
          Миний ангиуд
        </h1>
        <div className="flex flex-col space-x-2">
          <AddClass />
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Анги олдсонгүй. Шинэ анги үүсгэх үү?
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {classes.map((cls) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              key={cls.id}
              className="w-[240px] h-[240px] bg-[#2C3A4A] dark:bg-white rounded-2xl shadow-2xl flex flex-col relative cursor-pointer"
              onClick={() => handleClassClick(cls.id)}
            >
              <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700/20">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none">
                      <Image
                        src={"/myclass/cogwheel.png"}
                        width={20}
                        height={20}
                        alt="Settings"
                        className="w-5 h-5 md:w-6 md:h-6"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-46 bg-[#f5f5f5] dark:bg-[#2C3A4A] border border-[#e1aa77]/30 rounded-lg shadow-lg "
                    align="end"
                    sideOffset={5}
                  >
                    <DropdownMenuLabel className="text-[#2C3A4A] dark:text-[#e1aa77] px-3 py-2 font-medium">
                      Ангийн тохиргоо
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#e1aa77]/30" />
                    <DropdownMenuItem
                      className="text-[#2C3A4A] dark:text-white hover:bg-[#e1aa77]/20 hover:text-[#2C3A4A] dark:hover:text-[#e1aa77] px-3 py-2 text-sm cursor-pointer focus:bg-[#e1aa77]/10 focus:text-[#2C3A4A] dark:focus:text-[#e1aa77]"
                      onClick={() => handleClassClick(cls.id)}
                    >
                      Ангийн мэдээлэл
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-[#2C3A4A] dark:text-white hover:bg-[#e1aa77]/20 hover:text-[#2C3A4A] dark:hover:text-[#e1aa77] px-3 py-2 text-sm cursor-pointer focus:bg-[#e1aa77]/10 focus:text-[#2C3A4A] dark:focus:text-[#e1aa77]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Тохиргоо
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#e1aa77]/30" />
                    <DropdownMenuItem
                      className="text-red-500 hover:bg-red-500/10 px-3 py-2 text-sm cursor-pointer focus:bg-red-500/10"
                      onClick={(e) => handleDeleteClass(cls.id, e)}
                    >
                      Анги устгах
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div className="mb-4">
                  <Image
                    src={"/myclass/earth.png"}
                    width={60}
                    height={60}
                    alt="Class icon"
                    className="w-14 h-14 md:w-16 md:h-16"
                  />
                </div>
                <div className="w-full flex flex-col items-center text-center">
                  <h2 className="text-lg md:text-xl font-bold text-white dark:text-[#e1aa77] line-clamp-1">
                    {cls.name}
                  </h2>
                  <p className="text-white dark:text-[#e1aa77] text-xs md:text-sm">
                    Үүссэн: {new Date(cls.createdAt).toLocaleDateString()}
                  </p>
                  {cls.promoCode && (
                    <p className="text-xs md:text-sm text-white dark:text-[#e1aa77] mt-1">
                      Код:{" "}
                      <span className="text-[#e1aa77] dark:text-black font-medium">
                        {cls.promoCode}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
