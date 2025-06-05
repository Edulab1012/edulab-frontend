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
  Check,
  Clock,
  X,
  Edit,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

interface AttendanceRecord {
  studentId: string;
  status: "present" | "absent" | "late";
  name: string;
}

export default function ClassStudentsPage({
  params,
}: {
  params: { classId: string };
}) {
  const { classId } = params;
  const router = useRouter();
  const { theme } = useTheme();
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendanceMode, setAttendanceMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [attendance, setAttendance] = useState<
    Record<string, "present" | "absent" | "late">
  >({});
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const [classResponse, attendanceResponse] = await Promise.all([
          axios.get(`${BASE_URL}class/${classId}/students`),
          axios.get(`${BASE_URL}attendance/class/${classId}/today`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setClassName(classResponse.data.className);
        setStudents(classResponse.data.students);
        setTodayAttendance(attendanceResponse.data);

        // Initialize attendance data if available
        if (attendanceResponse.data.length > 0) {
          const initialAttendance: Record<
            string,
            "present" | "absent" | "late"
          > = {};
          attendanceResponse.data.forEach((record: AttendanceRecord) => {
            initialAttendance[record.studentId] = record.status;
          });
          setAttendance(initialAttendance);
        }
      } catch (error) {
        console.log("Error fetching class data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId]);

  const handleStatusChange = (
    studentId: string,
    status: "present" | "absent" | "late"
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const markAllPresent = () => {
    const newAttendance: Record<string, "present"> = {};
    students.forEach((student) => {
      newAttendance[student.id] = "present";
    });
    setAttendance(newAttendance);
  };

  const markAllAbsent = () => {
    const newAttendance: Record<string, "absent"> = {};
    students.forEach((student) => {
      newAttendance[student.id] = "absent";
    });
    setAttendance(newAttendance);
  };

  const submitAttendance = async () => {
    setIsSubmitting(true);
    setAttendanceStatus("idle");
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }

      await axios.post(
        `${BASE_URL}attendance/submit`,
        {
          attendanceData: attendance,
          classId: classId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh today's attendance after submission
      const attendanceResponse = await axios.get(
        `${BASE_URL}attendance/class/${classId}/today`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodayAttendance(attendanceResponse.data);

      setAttendanceStatus("success");
      toast.success("Attendance submitted successfully!");
      setTimeout(() => {
        setAttendanceMode(false);
        setEditMode(false);
        setAttendance({});
      }, 1500);
    } catch (error: any) {
      console.error("Error submitting attendance:", error);
      setAttendanceStatus("failed");
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to submit attendance"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditAttendance = () => {
    setEditMode(true);
    setAttendanceMode(true);
    setAttendanceStatus("idle");
  };

  const cancelEdit = () => {
    setEditMode(false);
    setAttendanceMode(false);
    setAttendanceStatus("idle");
    // Reset to original attendance data
    const initialAttendance: Record<string, "present" | "absent" | "late"> = {};
    todayAttendance.forEach((record) => {
      initialAttendance[record.studentId] = record.status;
    });
    setAttendance(initialAttendance);
  };

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
    <div className="p-4 md:p-8 md:ml-64 mt-[80px] relative pb-[150px]">
      {/* Back button */}
      <motion.button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 shadow-md"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 20px rgba(107, 90, 237, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <ChevronLeft className="w-5 h-5" />
        Буцах
      </motion.button>

      {/* Class header */}
      <div className="mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-light text-[#2C3A4A] dark:text-white mb-2 flex items-center gap-3">
          <BookOpen className="text-[#6B5AED]" />
          {className}
        </h1>
        <div className="w-full h-1 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] rounded-full"></div>
      </div>

      {/* Today's Attendance Summary */}
      {todayAttendance.length > 0 && !attendanceMode && (
        <motion.div
          className="bg-white dark:bg-[#121220] rounded-2xl shadow-xl overflow-hidden border border-[#6B5AED]/20 dark:border-[#6B5AED]/10 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-4 border-b border-[#6B5AED]/20 bg-gradient-to-r from-[#6B5AED]/5 to-[#8A7CFF]/5 dark:from-[#6B5AED]/10 dark:to-[#8A7CFF]/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#2C3A4A] dark:text-white flex items-center gap-2">
              <Check className="text-[#6B5AED]" />
              Өнөөдрийн ирц ({todayAttendance.length})
            </h2>
            <motion.button
              onClick={startEditAttendance}
              className="px-4 py-2 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Edit className="w-4 h-4" />
              Засах
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#6B5AED]/5 to-[#8A7CFF]/5 dark:from-[#6B5AED]/10 dark:to-[#8A7CFF]/10 text-left">
                  <th className="p-4 text-[#2C3A4A] dark:text-white font-medium rounded-tl-lg">
                    Сурагч
                  </th>
                  <th className="p-4 text-[#2C3A4A] dark:text-white font-medium">
                    Ирц
                  </th>
                </tr>
              </thead>
              <tbody>
                {todayAttendance.map((record, index) => (
                  <tr
                    key={record.studentId}
                    className={`border-b ${
                      index % 2 === 0
                        ? "bg-white dark:bg-[#121220]"
                        : "bg-[#f9f9f9] dark:bg-[#1A1A2E]"
                    }`}
                  >
                    <td className="p-4 text-[#2C3A4A] dark:text-white font-medium">
                      {record.name}
                    </td>
                    <td className="p-4">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          record.status === "present"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : record.status === "late"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {record.status === "present" && (
                          <Check className="w-4 h-4 mr-1" />
                        )}
                        {record.status === "late" && (
                          <Clock className="w-4 h-4 mr-1" />
                        )}
                        {record.status === "absent" && (
                          <X className="w-4 h-4 mr-1" />
                        )}
                        {record.status === "present"
                          ? "Ирсэн"
                          : record.status === "late"
                          ? "Хоцорсон"
                          : "Ирээгүй"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Students table */}
      <motion.div
        className="bg-white dark:bg-[#121220] rounded-2xl shadow-xl overflow-hidden border border-[#6B5AED]/20 dark:border-[#6B5AED]/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 border-b border-[#6B5AED]/20 bg-gradient-to-r from-[#6B5AED]/5 to-[#8A7CFF]/5 dark:from-[#6B5AED]/10 dark:to-[#8A7CFF]/10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#2C3A4A] dark:text-white flex items-center gap-2">
              <Users className="text-[#6B5AED]" />
              Сурагчид ({students.length})
            </h2>
            {!attendanceMode ? (
              <motion.button
                onClick={() => setAttendanceMode(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Plus className="w-4 h-4" />
                Ирц бүртгэх
              </motion.button>
            ) : (
              <div className="flex gap-2">
                <motion.button
                  onClick={markAllPresent}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-1 text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Check className="w-4 h-4" />
                  Бүгд ирсэн
                </motion.button>
                <motion.button
                  onClick={markAllAbsent}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-1 text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <X className="w-4 h-4" />
                  Бүгд ирээгүй
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/myclass/empty-class.png"
                width={96}
                height={96}
                alt="No students"
                className="dark:invert opacity-70"
              />
            </div>
            <p className="text-lg">Сурагч бүртгэгдээгүй байна</p>
            <motion.button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus className="w-4 h-4" />
              Сурагч нэмэх
            </motion.button>
          </div>
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
                  <th className="p-4 text-[#2C3A4A] dark:text-white font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Утас
                  </th>
                  {attendanceMode && (
                    <th className="p-4 text-[#2C3A4A] dark:text-white font-medium rounded-tr-lg">
                      Ирц
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b ${
                      index % 2 === 0
                        ? "bg-white dark:bg-[#121220]"
                        : "bg-[#f9f9f9] dark:bg-[#1A1A2E]"
                    }`}
                  >
                    <td className="p-4 text-[#2C3A4A] dark:text-white font-medium flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src="/myclass/panda.png"
                          width={40}
                          height={40}
                          alt="Student"
                          className="rounded-full border-2 border-[#6B5AED]/30"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#121220]"></span>
                      </div>
                      <span>
                        {student.firstName} {student.lastName}
                      </span>
                    </td>
                    <td className="p-4 text-[#2C3A4A] dark:text-gray-300">
                      {student.email ? (
                        <a
                          href={`mailto:${student.email}`}
                          className="hover:text-[#6B5AED] transition-colors flex items-center gap-1"
                        >
                          <Mail className="w-4 h-4" />
                          {student.email}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-[#2C3A4A] dark:text-gray-300">
                      {student.phoneNumber ? (
                        <a
                          href={`tel:${student.phoneNumber}`}
                          className="hover:text-[#6B5AED] transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-4 h-4" />
                          {student.phoneNumber}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    {attendanceMode && (
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(student.id, "present")
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              attendance[student.id] === "present"
                                ? "bg-green-500 text-white"
                                : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(student.id, "late")
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              attendance[student.id] === "late"
                                ? "bg-yellow-500 text-white"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50"
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(student.id, "absent")
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              attendance[student.id] === "absent"
                                ? "bg-red-500 text-white"
                                : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Attendance Footer */}
      {attendanceMode && (
        <div className="fixed bottom-0 right-0 left-0 bg-[#2C3A4A] h-[100px] dark:bg-black border-t-2 border-t-white flex justify-center items-center">
          <div className="flex justify-center items-center gap-4 h-full w-full px-4">
            <button
              onClick={
                editMode
                  ? cancelEdit
                  : () => {
                      setAttendanceMode(false);
                      setAttendance({});
                      setAttendanceStatus("idle");
                    }
              }
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px] h-full flex items-center justify-center px-6"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              {editMode ? "Цуцлах" : "Буцах"}
            </button>

            {attendanceStatus === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg"
              >
                <Check className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  Амжилттай бүртгэгдлээ!
                </span>
              </motion.div>
            ) : attendanceStatus === "failed" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg"
              >
                <X className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  Алдаа гарлаа! Дахин оролдоно уу.
                </span>
              </motion.div>
            ) : (
              <button
                onClick={submitAttendance}
                disabled={isSubmitting}
                className={`text-lg font-semibold ${
                  isSubmitting
                    ? "bg-gray-500"
                    : "bg-gradient-to-r from-[#6B5AED] to-[#8A7CFF]"
                } text-white transition-all duration-400 ease-in-out p-[10px] h-full flex items-center justify-center px-6 rounded-lg`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="rounded-full h-5 w-5 border-t-2 border-b-2 border-white"
                    />
                    <span>Бүртгэж байна...</span>
                  </div>
                ) : (
                  `${editMode ? "Хадгалах" : "Ирц баталгаажуулах"}`
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
