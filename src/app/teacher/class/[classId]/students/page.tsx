"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  Plus,
  User,
  Mail,
  Phone,
  BookOpen,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

export default function ClassStudentsPage({ params }: any) {
  const { classId } = params;
  const router = useRouter();
  const { theme } = useTheme();
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}class/${classId}/students`
        );
        setClassName(response.data.className);
        setStudents(response.data.students);
      } catch (error) {
        console.log("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  if (!mounted || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B5AED]"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 md:ml-64 mt-[80px] relative">
      {/* Back button with improved animation */}
      <motion.button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 shadow-md"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 20px rgba(107, 90, 237, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronLeft className="w-5 h-5" />
        Буцах
      </motion.button>

      <motion.div
        className="mb-8 relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#2C3A4A] dark:text-white mb-2 flex items-center gap-3">
          <BookOpen className="text-[#6B5AED]" />
          {className}
        </h1>
        <div className="w-full h-1 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] rounded-full"></div>
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 bg-[#6B5AED]/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-2 -right-4 w-6 h-6 bg-[#8A7CFF]/20 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      <motion.div
        className="bg-white dark:bg-[#121220] rounded-2xl shadow-xl overflow-hidden border border-[#6B5AED]/20 dark:border-[#6B5AED]/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {/* Card header with gradient */}
        <div className="p-4 border-b border-[#6B5AED]/20 bg-gradient-to-r from-[#6B5AED]/5 to-[#8A7CFF]/5 dark:from-[#6B5AED]/10 dark:to-[#8A7CFF]/10">
          <h2 className="text-xl font-semibold text-[#2C3A4A] dark:text-white flex items-center gap-2">
            <Users className="text-[#6B5AED]" />
            Сурагчид ({students.length})
          </h2>
        </div>

        {students.length === 0 ? (
          <motion.div
            className="p-8 text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/myclass/empty-class.png"
                width={96}
                height={96}
                alt="No students"
                className="dark:invert opacity-70"
              />
              <motion.div
                className="absolute inset-0 bg-[#6B5AED]/10 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </div>
            <p className="text-lg">Сурагч бүртгэгдээгүй байна</p>
            <motion.button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 5px 15px rgba(107, 90, 237, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus className="w-4 h-4" />
              Сурагч нэмэх
            </motion.button>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#6B5AED]/5 to-[#8A7CFF]/5 dark:from-[#6B5AED]/10 dark:to-[#8A7CFF]/10 text-left">
                  <th className="p-4 text-[#2C3A4A] dark:text-white font-medium rounded-tl-lg flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Сурагч
                  </th>
                  <th className="p-4 text-[#2C3A4A] dark:text-white font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Имэйл
                  </th>
                  <th className="p-4 text-[#2C3A4A] dark:text-white font-medium rounded-tr-lg flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Утас
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    className={`border-b ${index % 2 === 0
                        ? "bg-white dark:bg-[#121220]"
                        : "bg-[#f9f9f9] dark:bg-[#1A1A2E]"
                      }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(107, 90, 237, 0.1)"
                          : "rgba(107, 90, 237, 0.05)",
                      scale: 1.005,
                    }}
                  >
                    <td className="p-4 text-[#2C3A4A] dark:text-white font-medium flex items-center gap-3">
                      <div className="relative">
                        <motion.div whileHover={{ rotate: 5 }}>
                          <Image
                            src="/myclass/panda.png"
                            width={40}
                            height={40}
                            alt="Student"
                            className="rounded-full border-2 border-[#6B5AED]/30"
                          />
                        </motion.div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#121220]"></span>
                      </div>
                      <span>
                        {student.firstName} {student.lastName}
                      </span>
                    </td>
                    <td className="p-4 text-[#2C3A4A] dark:text-gray-300">
                      {student.email ? (
                        <motion.a
                          href={`mailto:${student.email}`}
                          className="hover:text-[#6B5AED] transition-colors flex items-center gap-1"
                          whileHover={{ x: 2 }}
                        >
                          <Mail className="w-4 h-4" />
                          {student.email}
                        </motion.a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-[#2C3A4A] dark:text-gray-300">
                      {student.phoneNumber ? (
                        <motion.a
                          href={`tel:${student.phoneNumber}`}
                          className="hover:text-[#6B5AED] transition-colors flex items-center gap-1"
                          whileHover={{ x: 2 }}
                        >
                          <Phone className="w-4 h-4" />
                          {student.phoneNumber}
                        </motion.a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="fixed -bottom-20 -right-20 w-60 h-60 bg-[#6B5AED]/10 rounded-full blur-xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed -top-20 -left-20 w-80 h-80 bg-[#8A7CFF]/10 rounded-full blur-xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Responsive adjustments */}
      <style jsx global>{`
        @media (max-width: 768px) {
          table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }

          th,
          td {
            min-width: 150px;
          }
        }

        table {
          border-collapse: separate;
          border-spacing: 0;
        }

        th:first-child {
          border-top-left-radius: 0.75rem;
        }

        th:last-child {
          border-top-right-radius: 0.75rem;
        }

        tr:last-child td:first-child {
          border-bottom-left-radius: 0.75rem;
        }

        tr:last-child td:last-child {
          border-bottom-right-radius: 0.75rem;
        }
      `}</style>
    </div>
  );
}
