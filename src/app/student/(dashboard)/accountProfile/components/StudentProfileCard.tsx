"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Stickers from "./stickers";
import EditProfile from "./EditProfile";
import { Student } from "./types";

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
    <div className="flex justify-center items-center p-6 min-h-screen">
      <Card className="w-full max-w-4xl p-6">
        <CardHeader className="flex items-center gap-6 px-6 pt-6">
          <Avatar className="w-28 h-28 shadow-lg rounded-full">
            <AvatarImage src={student.avatarUrl} alt="Avatar" />
            <AvatarFallback>{student.firstName.charAt(0)}</AvatarFallback>
          </Avatar>

          {!isEditing && (
            <div className="flex-1 flex justify-center">
              <Stickers />
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-x-16 gap-y-6 font-medium text-sm">
                <Info label="Овог" value={student.lastName} />
                <Info label="Нэр" value={student.firstName} />
                <Info label="Анги" value={student.grade} />
                <Info label="Утасны дугаар" value={student.phoneNumber} />
                <Info label="Имэйл хаяг" value={student.email} />
                <Info label="Анги даасан багш" value={student.teacher} />
              </div>

              <div className="flex justify-end mt-8">
                <button
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-gray-500">{label}</Label>
      <div className="bg-white p-2 rounded-md shadow-sm border mt-1">{value}</div>
    </div>
  );
}
