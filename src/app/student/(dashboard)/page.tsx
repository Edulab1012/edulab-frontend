"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookCheck,
  CalendarDays,
  LayoutDashboard,
  ScanEye,
  User,
  Backpack,
} from "lucide-react";

export default function StudentHomePage() {
  const [studentName, setStudentName] = useState("Билгүүн Энхбаяр");

  return (
    <div className="ml-[160px] w-[1000px] mt-[120px]">
      <h1 className="text-2xl font-bold text-white mb-[40px]">
        👋 Сайн байна уу, {studentName}
      </h1>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {" "}
          <Card className="w-70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Миний мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p>Анги: 12А</p>
              <p>Овог нэр: Билгүүн Энхбаяр</p>
              <p>И-мэйл: bilguun@example.mn</p>
            </CardContent>
          </Card>
          <Card className="w-70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" /> Анги даасан багш
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p>Багш: Оюунбат Батнасан</p>
              <p>И-мэйл: oyunbat.teacher@school.mn</p>
              <p>Хичээл: Математик, Геометр</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          {" "}
          <Card className="w-70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookCheck className="h-5 w-5" /> Миний дүн
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p>Сүүлийн шалгалтын дүн: 87%</p>
              <p>Дундаж дүн: 84%</p>
            </CardContent>
          </Card>
          <Card className="w-70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanEye className="h-5 w-5" /> Ирцийн бүртгэл
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <p>Нийт ирц: 92%</p>
              <p>Сүүлд ирсэн огноо: 2025-05-19</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
