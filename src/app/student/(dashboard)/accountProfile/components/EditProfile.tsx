"use client";

import { useRef, useState } from "react";
import { Student } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditProfileProps {
  initialData: Student;
  onSave: (data: Student) => void;
  onCancel: () => void;
}

export default function EditProfile({ initialData, onSave, onCancel }: EditProfileProps) {
  const [formData, setFormData] = useState<Student>(initialData);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="p-6 border rounded shadow bg-gray-50 max-w-3xl mx-auto">
      <div className="flex justify-center mb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Avatar
          onClick={handleAvatarClick}
          className="w-24 h-24 shadow-md cursor-pointer hover:ring-2 hover:ring-blue-500"
        >
          <AvatarImage src={formData.avatarUrl} alt="Avatar" />
          <AvatarFallback>{formData.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <h2 className="text-xl font-light mb-6 text-center">Мэдээлэл засах</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lastName" className="block mb-1 text-gray-700">
            Овог:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="firstName" className="block mb-1 text-gray-700">
            Нэр:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="grade" className="block mb-1 text-gray-700">
            Анги:
          </label>
          <input
            id="grade"
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block mb-1 text-gray-700">
            Утасны дугаар:
          </label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-gray-700">
            Имэйл хаяг:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="teacher" className="block mb-1 text-gray-700">
            Анги даасан багш:
          </label>
          <input
            id="teacher"
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Хадгалах
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Болих
        </button>
      </div>
    </div>
  );
}
