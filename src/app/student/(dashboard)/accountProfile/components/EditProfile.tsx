"use client";

import { useRef, useState } from "react";
import { Student } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-tr from-[#FDF2F8] to-[#E0E7FF] dark:from-[#1F1D42] dark:to-[#312E81] p-6 rounded-3xl shadow-xl max-w-4xl w-full mx-auto"
    >
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
          className="w-24 h-24 shadow-lg cursor-pointer ring-2 ring-[#6B5AED] hover:scale-105 transition"
        >
          <AvatarImage src={formData.avatarUrl} alt="Avatar" />
          <AvatarFallback>{formData.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <h2 className="text-center text-xl font-bold text-[#6B5AED] dark:text-white mb-8">
        ✏️ Хувийн мэдээлэл засах
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { id: "lastName", label: "Овог" },
          { id: "firstName", label: "Нэр" },
          { id: "grade", label: "Анги" },
          { id: "phoneNumber", label: "Утасны дугаар" },
          { id: "email", label: "Имэйл хаяг" },
          { id: "teacher", label: "Анги даасан багш" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              name={field.id}
              value={(formData as any)[field.id]}
              onChange={handleChange}
              className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B5AED] dark:bg-white/10 dark:text-white"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
        >
          Болих
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#6B5AED] text-white rounded-xl hover:bg-purple-700 transition"
        >
          Хадгалах
        </button>
      </div>
    </motion.div>
  );
}