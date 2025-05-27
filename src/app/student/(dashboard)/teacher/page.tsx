"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/constants/baseurl";
import {
  Loader2,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Info,
  NotebookText,
  CalendarDays,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  subject: string[];
  grade: number;
  group: string;
  bio?: string;
  experienceYears?: number;
  hobbies?: string;
}

export default function StudentTeacherPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeacher({
        firstName: "Оюунбат",
        lastName: "Батнасан",
        email: "oyunbat.teacher@school.mn",
        phoneNumber: "99001122",
        subject: ["Математик", "Геометр"],
        grade: 12,
        group: "A",
        bio: "Математикийн чиглэлээр 10 жилийн туршлагатай. Энгийн ойлголтоор заах дуртай.",
        experienceYears: 10,
        hobbies: "Шатар тоглох, ном унших",
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm">Ачааллаж байна...</span>
      </div>
    );
  }

  if (!teacher) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Багшийн мэдээлэл олдсонгүй.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-light mb-4">
        🎓 Сурагчийн мэдээллийн хуудас
      </h1>

      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">🧑‍🏫 Анги даасан багш</CardTitle>
          <CardDescription>
            Таны хичээл заадаг багшийн дэлгэрэнгүй мэдээлэл
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>👤 Нэр:</strong> {teacher.lastName} {teacher.firstName}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> <span>{teacher.email}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> <span>{teacher.phoneNumber}</span>
          </p>
          <p className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Хичээл:{" "}
            {teacher.subject.join(", ")}
          </p>
          <p className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Анги: {teacher.grade}-р анги /{" "}
            {teacher.group} бүлэг
          </p>
          <Separator />
          <p className="flex items-center gap-2">
            <Info className="h-4 w-4" /> {teacher.bio}
          </p>
          <p>
            <strong>🗓️ Туршлага:</strong> {teacher.experienceYears} жил
          </p>
          <p>
            <strong>🎯 Сонирхол:</strong> {teacher.hobbies}
          </p>
        </CardContent>
      </Card>

      {/* Additional student sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <NotebookText className="h-5 w-5" /> Миний хичээлүүд
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              <li>Математик</li>
              <li>Газарзүй</li>
              <li>Англи хэл</li>
              <li>Физик</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" /> Ирэх хичээлүүд
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            <ul className="space-y-1">
              <li>📅 Даваа - 10:00 — Математик</li>
              <li>📅 Мягмар - 11:30 — Англи хэл</li>
              <li>📅 Лхагва - 09:00 — Газарзүй</li>
              <li>📅 Пүрэв - 13:00 — Физик</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
