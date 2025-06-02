"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import EditProfile from "./EditProfile";
import { Student } from "./types";
import { motion } from "framer-motion";
import Stickers from "./stickers";

export default function StudentProfileCard() {
  const [student, setStudent] = useState<Student>({
    firstName: "Уянга",
    lastName: "Бат",
    grade: "11A",
    phoneNumber: "95152233",
    email: "uyangaab@gmail.com",
    teacher: "Дуламсүрэн",
    avatarUrl: "/student.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedStudent: Student) => {
    setStudent(updatedStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-[#E0E7FF] dark:from-[#121220] dark:to-[#1E1B4B] flex justify-center items-center p-6 mt-35">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white dark:bg-[#1f1d42] rounded-3xl shadow-2xl p-8 space-y-8"
      >
        <CardHeader className="flex items-center gap-6">
          <Avatar className="w-24 h-24 shadow-md rounded-full">
            <AvatarImage src={student.avatarUrl} alt="Avatar" />
            <AvatarFallback>{student.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardHeader>

        <CardContent className="">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 font-medium text-sm">
                <Info label="Овог" value={student.lastName} />
                <Info label="Нэр" value={student.firstName} />
                <Info label="Анги" value={student.grade} />
                <Info label="Утасны дугаар" value={student.phoneNumber} />
                <Info label="Имэйл хаяг" value={student.email} />
                <Info label="Анги даасан багш" value={student.teacher} />
              </div>

              <div className="flex justify-end mt-8">
                <button
                  className="px-6 py-2 bg-[#6B5AED] text-white rounded-full hover:bg-[#5a4ce0] transition"
                  onClick={() => setIsEditing(true)}
                >
                  Засах
                </button>
              </div>
            </>
          ) : (
            <EditProfile
              initialData={student}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </CardContent>

        {!isEditing && <Stickers />}
      </motion.div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-gray-500 dark:text-gray-300">{label}</Label>
      <div className="bg-white dark:bg-[#2a2750] text-gray-800 dark:text-white p-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 mt-1">
        {value}
      </div>
    </div>
  );
}

