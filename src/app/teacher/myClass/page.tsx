"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import Footer from "./components/Footer";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

export default function AttendancePage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<
    Record<string, "present" | "absent" | "late" | null>
  >({});
  const [activeSection, setActiveSection] = useState<"home" | "attendance">(
    "home"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId");
        console.log("Teacher ID:", teacherId);
        if (!teacherId) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          `${BASE_URL}class/teacher/${teacherId}/students`
        );
        setStudents(response.data.students);

        // Initialize attendance state
        const initialAttendance: Record<
          string,
          "present" | "absent" | "late" | null
        > = {};
        response.data.students.forEach((student: Student) => {
          initialAttendance[student.id] = null;
        });
        setAttendance(initialAttendance);

        // const attendanceRes = await axios.get(`${BASE_URL}attendance/today`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        // setAttendance((prev) => ({ ...prev, ...attendanceRes.data }));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [router]);

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
    try {
      // Filter out null values
      const attendanceData = Object.fromEntries(
        Object.entries(attendance).filter(([_, status]) => status !== null)
      ) as Record<string, "present" | "absent" | "late">;

      await axios.post(
        `${BASE_URL}attendance/submit`,
        {
          attendanceData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance");
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-[100px]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#6B5AED] mb-8">
          Student Attendance
        </h1>

        {activeSection === "attendance" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center ${getStatusColor(
                                attendance[student.id]
                              )}`}
                            >
                              <span className="text-white font-bold">
                                {student.firstName.charAt(0)}
                                {student.lastName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {student.firstName} {student.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            attendance[student.id] === "present"
                              ? "bg-green-100 text-green-800"
                              : attendance[student.id] === "late"
                              ? "bg-yellow-100 text-yellow-800"
                              : attendance[student.id] === "absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {attendance[student.id] || "Not marked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleStatusChange(student.id, "present")
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              attendance[student.id] === "present"
                                ? "bg-green-500 text-white"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(student.id, "late")
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              attendance[student.id] === "late"
                                ? "bg-yellow-500 text-white"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }`}
                          >
                            Late
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(student.id, "absent")
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              attendance[student.id] === "absent"
                                ? "bg-red-500 text-white"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer
        onSelectSection={setActiveSection}
        activeSection={activeSection}
        markAllPresent={markAllPresent}
        markAllAbsent={markAllAbsent}
        studentStatus={attendance}
        onSubmitAttendance={submitAttendance}
      />
    </div>
  );
}
