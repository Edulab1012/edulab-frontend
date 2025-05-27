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
      <p className="text-[14px] font-medium w-[100px] text-center truncate">
        {student.firstName}
      </p>
    </motion.div>
  );
};
// useEffect(() => {
//   if (activeSection === "attendance") {
//     const fetchTodaysAttendance = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("No token found");

//         const res = await fetch(
//           "http://localhost:8000/api/v1/teacher/attendance/today",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!res.ok) {
//           const errorData = await res.json().catch(() => res.text());
//           throw new Error(
//             typeof errorData === "object" ? errorData.message : errorData
//           );
//         }

//         const data = await res.json();
//         setStudentStatus(data);
//       } catch (err: any) {
//         console.error("Error fetching today's attendance:", err);
//       }
//     };

//     fetchTodaysAttendance();
//   }
// }, [activeSection]);
export default function MyClassOverview() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"home" | "attendance">(
    "home"
  );

  const [studentStatus, setStudentStatus] = useState<
    Record<string, "present" | "late" | "absent" | null>
  >({});

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

  return (
    <div className="p-10 min-h-screen w-full max-w-[1240px] mx-auto flex flex-col items-center justify-center bg-teal-400 mt-[100px] space-y-10">
      <h2 className="text-4xl font-light text-white">
        👩‍🏫 11А ангийн хяналтын самбар
      </h2>

      {/* Cards Overview */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            title: "Сурагчдын тоо",
            value: `${students.length} сурагч`,
            color: "text-blue-600",
          },
          {
            title: "Дундаж ирц",
            value: "91%",
            color: "text-green-600",
          },
          {
            title: "Сурагчийн асуудал",
            value: (
              <span className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />2 сурагчийн хичээл тасалсан
              </span>
            ),
            color: "text-red-500",
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
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className={`text-xl font-light ${item.color}`}>
                {item.value}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ x: -520 }}
        animate={{ x: [0, 320, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="flex items-center gap-2">
            <User className="text-blue-400 w-5 h-5" />
            <CardTitle className="text-sm">Шинээр элссэн сурагч</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 text-xl font-light flex justify-between items-center">
            {students.slice(-1).map((student, index) => (
              <p key={index}>{student.firstName}</p>
            ))}
            <AddStudent />
          </CardContent>
        </Card>
      </motion.div>

      <div className="mb-[120px] ml-[80px] w-full flex flex-wrap gap-6 justify-center border-2 border-white rounded-md p-10 bg-white/10">
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

      <Footer
        onSelectSection={setActiveSection}
        activeSection={activeSection}
        markAllPresent={markAllPresent}
        markAllAbsent={markAllAbsent}
      />
    </div>
  );
}
