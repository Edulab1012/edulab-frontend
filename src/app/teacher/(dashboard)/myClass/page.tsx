"use client";

import { AlertTriangle, User, NotebookPen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddStudent from "./components/AddStudentButton";
import { useEffect, useState } from "react";
// type User = {
//   id: number;
//   lastname: string;
//   firstname: string;
//   email: string;
//   contact: number;
//   emergency: number;
// };

export default function MyClassOverview() {
  // const [data, setData] = useState<User[]>([]);
  // console.log(data);
  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //     if (!token) return;

  //     const decoded = JSON.parse(atob(token.split(".")[1]));
  //     const teacherId = decoded.teacherId;
  //     const res = await fetch(`https://dojoback.onrender.com/api/v1/student/students`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       cache: "no-store",
  //     });
  //     const teacherData = await res.json();
  //     const students = teacherData.students;
  //     const formattedData: User[] = students.map((s: any) => ({
  //       id: Number(s.id),
  //       lastname: s.lastName,
  //       firstname: s.firstName,
  //       email: s.email,
  //       contact: Number(s.phoneNumber),
  //       emergency: Number(s.emergencyNumber),
  //     }));

  //     setData(formattedData);
  //   };

  //   fetchStudents();
  // }, []);

  return (
    <div className="p-10 bg-white space-y-8 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">
        👩‍🏫 11А ангийн хяналтын самбар
      </h2>

      <div>
        {" "}
        {/* Key stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-amber-100 p-2 rounded-2xl">
          <Card className="">
            <CardHeader>
              <CardTitle>Сурагчдын тоо</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-bold text-blue-600">
              30
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Дундаж ирц</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-bold text-green-600">
              91%
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Сурагчийн асуудал</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-red-500 text-sm">
              <AlertTriangle className="w-4 h-4" />2 сурагчийн хичээл тасалсан
            </CardContent>
          </Card>
        </div>
        {/* Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-100 mt-5 p-2 rounded-2xl">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <User className="text-blue-400 w-5 h-5" />
              <CardTitle className="text-sm">Шинээр элссэн сурагч</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-xl font-bold">
              Ган-Эрдэнэ (2025/05/19)
              <AddStudent className="m-5"></AddStudent>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <NotebookPen className="text-purple-400 w-5 h-5" />
              <CardTitle className="text-sm">Шалгалт авсан</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-sm">
              Математик — 25 сурагч оролцсон
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
