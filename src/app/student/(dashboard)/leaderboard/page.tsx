"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import Image from "next/image";

const sampleData = [
  {
    name: "Уянга Бат",
    avatar: "/student.png",
    points: 1500,
  },
  {
    name: "Тэмүүжин Сүх",
    avatar: "/student.png",
    points: 1320,
  },
  {
    name: "Ануужин Мөнх",
    avatar: "/student.png",
    points: 1210,
  },


];

export default function Leaderboard() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-2xl font-light text-center mb-6 text-[#6B5AED] dark:text-white ">
        🏆 Ангийн Хамгийн Шилдгүүд
      </h2>

      <div className="space-y-4">
        {sampleData.map((student, index) => (
          <motion.div
            key={student.name}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-4 rounded-2xl shadow-xl relative overflow-hidden border-l-8 
              ${index === 0 ? "border-yellow-400 bg-yellow-100/50" : "border-[#6B5AED]/60 bg-white dark:bg-[#1f1d42]"}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={student.avatar}
                  alt={student.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-white shadow-md"
                />
                {index === 0 && (
                  <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-500 animate-bounce" />
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-gray-800 dark:text-white">
                  {index + 1}. {student.name}
                </p>
                <p className="text-sm text-gray-500">Оноо: {student.points}</p>
              </div>
            </div>
            <div className="text-xl font-light text-[#6B5AED]">+{Math.floor(student.points / 10)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
