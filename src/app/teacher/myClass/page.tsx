"use client";
import React, { useEffect, useState } from "react";
import { AlertTriangle, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddStudent from "./components/AddStudentButton";
import Footer from "./components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emergencyNumber: string;
  gender: string;
  teacher?: { firstName: string; lastName: string };
  group?: { name: string };
  grade?: { name: string };
  img?: string;
}
interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

interface AttendanceSummary {
  studentId: string;
  name: string;
  totalDays: number;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  attendanceRate: number;
}
interface Group {
  id: string;
  name: string;
  grade?: { number: number };
}
const eggImages = [
  "/egg/yellow-egg.png",
  "/egg/orange-egg.png",
  "/egg/green-egg.png",
  "/egg/red-egg.png",
  "/egg/pink-egg.png",
];

const StudentCard = ({
  student,
  index,
  showStatus,
  statusColor = "bg-gray-300",
}: {
  student: Student;
  index: number;
  showStatus?: boolean;
  statusColor?: string;
}) => {
  const imgSrc = eggImages[index % eggImages.length];

  return (
    <motion.div
      key={student.id}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      className="w-[110px] h-[110px] rounded-2xl bg-white flex items-center justify-center hover:-translate-y-2.5 transition duration-300 relative shadow-md"
    >
      <Image
        src={imgSrc}
        alt={`student-egg-${index}`}
        width={65}
        height={65}
        className={`absolute -top-14 ${showStatus ? "grayscale opacity-85" : ""
          }`}
      />
      {showStatus && (
        <div
          className={`absolute left-20 -top-4 h-[38px] w-[38px] shadow-2xl rounded-full border-4 border-white ${statusColor}`}
        ></div>
      )}
      <p className="text-[14px] font-medium w-[100px] text-center truncate dark:text-[#ff9d2c]">
        {student.firstName}
      </p>
    </motion.div>
  );
};

export default function MyClassOverview() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [semester, setSemester] = useState<Semester | null>(null);
  const [groups, setGroup] = useState<Group[]>([]);
  console.log("groups", groups);
  const [absentTodayCount, setAbsentTodayCount] = useState(0);

  const [attendanceSummary, setAttendanceSummary] = useState<
    AttendanceSummary[]
  >([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeSection, setActiveSection] = useState<"home" | "attendance">(
    "home"
  );
  const [studentStatus, setStudentStatus] = useState<
    Record<string, "present" | "late" | "absent" | null>
  >({});

  useEffect(() => {
    if (activeSection === "attendance") {
      const fetchTodaysAttendance = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await fetch(
            "http://localhost:8000/api/v1/teacher/attendance/today",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            const errorData = await res.json().catch(() => res.text());
            throw new Error(
              typeof errorData === "object" ? errorData.message : errorData
            );
          }

          const data = await res.json();
          setStudentStatus(data);
        } catch (err: any) {
          console.log("Error fetching today's attendance:", err);
        }
      };

      fetchTodaysAttendance();
    }
  }, [activeSection]);
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const res = await fetch("http://localhost:8000/api/v1/class/group", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setGroup(data);
      } catch (err: any) {
        console.log("Error fetching group:", err);
        setError(err.message || "Unknown error occurred");
      }
    };
    fetchGroup();
  }, []);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(
          "http://localhost:8000/api/v1/student/withStudents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => res.text());
          throw new Error(
            typeof errorData === "object" ? errorData.message : errorData
          );
        }

        const data = await res.json();
        setStudents(data);
      } catch (err: any) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchCurrentSemester = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(
          "http://localhost:8000/api/v1/teacher/semester/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch semester");
        const data = await res.json();
        setSemester(data);
      } catch (err) {
        console.log("Error fetching semester:", err);
      }
    };

    fetchCurrentSemester();
  }, []);
  const countTodayAbsent = () => {
    return Object.values(studentStatus).filter((status) => status === "absent")
      .length;
  };
  useEffect(() => {
    setAbsentTodayCount(countTodayAbsent());
  }, [studentStatus]);
  const fetchAttendanceSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(
        "http://localhost:8000/api/v1/teacher/attendance/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch attendance summary");
      const data = await res.json();
      setAttendanceSummary(data.summary);
      setShowSummary(true);
    } catch (err) {
      console.log("Error fetching attendance summary:", err);
    }
  };
  const markAllPresent = () => {
    const newStatus: Record<string, "present" | "late" | "absent" | null> = {};
    students.forEach((student) => {
      newStatus[student.id] = "present";
    });
    setStudentStatus(newStatus);
  };

  const markAllAbsent = () => {
    const newStatus: Record<string, "present" | "late" | "absent" | null> = {};
    students.forEach((student) => {
      newStatus[student.id] = "absent";
    });
    setStudentStatus(newStatus);
  };

  const cycleStatus = (studentId: string) => {
    setStudentStatus((prev) => {
      const current = prev[studentId];
      let next: "present" | "late" | "absent" | null;

      if (current === "present") next = "late";
      else if (current === "late") next = "absent";
      else if (current === "absent") next = null;
      else next = "present";

      return { ...prev, [studentId]: next };
    });
  };

  const getStatusColor = (
    status: "present" | "late" | "absent" | null | undefined
  ) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "late":
        return "bg-yellow-400";
      case "absent":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  if (loading)
    return (
      <p className="p-10 ml-[60px] mt-[50px] text-white">⏳ Уншиж байна...</p>
    );

  if (error)
    return <p className="p-10 text-center text-red-500">❗ Алдаа: {error}</p>;

  async function submitAttendance(): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const attendanceData = students.reduce((acc, student) => {
        const status = studentStatus[student.id];
        if (status) {
          // Only include if status exists
          acc[student.id] = status;
        }
        return acc;
      }, {} as Record<string, "present" | "late" | "absent">);

      console.log("ATTENDANCE DATA", attendanceData);

      const res = await fetch(
        "http://localhost:8000/api/v1/teacher/attendance/submit",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attendanceData }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => res.text());
        console.log("Server error details:", errorData);
        throw new Error(
          typeof errorData === "object" ? errorData.message : errorData
        );
      }

      const responseData = await res.json();
      console.log("Success response:", responseData);
      alert("Ирц амжилттай бүртгэгдлээ!");
    } catch (err: any) {
      console.log("Submission error:", err);
      alert("Failed to submit attendance: " + (err.message || "Unknown error"));
    }
  }

  return (
    <div className="p-10 min-h-screen w-full max-w-[1240px] md:max-w-[800px] mx-auto flex flex-col items-center justify-center  bg-[#8ED6F0] dark:bg-gradient-to-br dark:from-[#2C3A4A] dark:to-[#1A2636]  mt-[100px] space-y-10 ">
      <div className="flex gap-2">
        {" "}
        <h2 className="lg:text-4xl lg:font-bold mb-[100px] text-2xl font-light text-center  text-[#2C3A4A] dark:text-[#FFD3A1]">
          {groups.map((group) => (
            <div className="flex ">
              <h1>{group.grade?.number}</h1>
              <h1>{group.name}</h1>
            </div>
          ))}{" "}
        </h2>
        <h2 className="lg:text-4xl lg:font-bold mb-[100px] text-2xl font-light text-center  text-[#2C3A4A] dark:text-[#FFD3A1]">
          {" "}
          ангийн хяналтын самбар
        </h2>
      </div>

      {/* Cards Overview */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          {
            title: "Сурагчдын тоо",
            value: `${students.length} сурагч`,
            color: "text-[#2C3A4A] dark:text-white",
          },
          {
            title: "Дундаж ирц",
            value: "91%",
            color: "text-[#2C3A4A] dark:text-white",
          },
          {
            title: "Сурагчийн асуудал",
            value: (
              <span className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                {absentTodayCount} сурагч хичээл тасалсан
              </span>
            ),
            color: "text-[#2C3A4A] dark:text-white",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3A4A] dark:text-[#FFD3A1] ">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className={`text-xl font-light ${item.color}`}>
                {item.value}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="w-[400px] md:w-[340px] lg:w-[580px]"
      >
        <Card>
          <CardHeader className="flex items-center gap-2">
            <User className="text-blue-400 w-4 h-5" />
            <CardTitle className="text-sm text-[#2C3A4A] dark:text-[#FFD3A1]">
              Шинээр элссэн сурагч
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#2C3A4A] dark:text-white text-xl font-light flex justify-between items-center">
            {students.slice(-1).map((student, index) => (
              <p key={index}>{student.firstName}</p>
            ))}
            <AddStudent />
          </CardContent>
        </Card>
      </motion.div>

      {students.length > 0 && (
        <div className="mb-[120px] flex flex-wrap gap-6 justify-center border-2 border-white rounded-md p-10 bg-gradient-to-br from-[#2C3A4A] to-[#1A2636] dark:bg-black">
          {students.map((student, index) => (
            <div
              key={student.id}
              onClick={() =>
                activeSection === "attendance" && cycleStatus(student.id)
              }
            >
              <StudentCard
                student={student}
                index={index}
                showStatus={activeSection === "attendance"}
                statusColor={getStatusColor(studentStatus[student.id])}
              />
            </div>
          ))}
        </div>
      )}
      {students.length === 0 && (
        <p className="text-center text-red-500">
          Сурагчид байхгүй байна. Та өөрийн ангийнхаа сурагчдыг бүртгэнэ үү!
        </p>
      )}
      {showSummary && (
        <div className="w-full bg-[#2C3A4A] dark:bg-black  p-6 rounded-lg shadow-lg mb-20">
          <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white dark:text-[#FFD3A1]">
            Сурагчдын ирцийн дүнгийн тойм
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className=" dark:bg-gradient-to-br dark:from-[#2C3A4A] dark:to-[#1A2636]">
                  <th className="py-2 px-4 border">Сурагч</th>
                  <th className="py-2 px-4 border">Ирсэн</th>
                  <th className="py-2 px-4 border">Хоцорсон</th>
                  <th className="py-2 px-4 border">Ирээгүй</th>
                  <th className="py-2 px-4 border">Нийт</th>
                  <th className="py-2 px-4 border">Үнэлгээ</th>
                </tr>
              </thead>
              <tbody className="dark:bg-[#2C3A4A]">
                {attendanceSummary.map((student) => (
                  <tr key={student.studentId}>
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border">{student.presentDays}</td>
                    <td className="py-2 px-4 border">{student.lateDays}</td>
                    <td className="py-2 px-4 border">{student.absentDays}</td>
                    <td className="py-2 px-4 border">{student.totalDays}</td>
                    <td className="py-2 px-4 border">
                      {(student.attendanceRate * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setShowSummary(false)}
            className="mt-4 bg-[#FF9C42] text-white px-4 py-2 rounded "
          >
            Буцах
          </button>
        </div>
      )}
      {!showSummary && activeSection === "home" && (
        <button
          onClick={fetchAttendanceSummary}
          className="bg-[#FF9C42] hover:bg-[#ffb36b] py-3 text-white px-6 rounded-lg transition mb-[200px]"
        >
          Сурагчдын ирцийн дүнгийн тойм харах
        </button>
      )}
      <Footer
        onSelectSection={setActiveSection}
        activeSection={activeSection}
        markAllPresent={markAllPresent}
        markAllAbsent={markAllAbsent}
        studentStatus={studentStatus}
        onSubmitAttendance={submitAttendance}
      />
    </div>
  );
}
