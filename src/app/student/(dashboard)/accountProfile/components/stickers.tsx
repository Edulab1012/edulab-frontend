"use client";

import { motion } from "framer-motion";

export default function Stickers() {
  const achievements = [
    {
      icon: "/stickers/owl.png",
      title: "Ажилсаг зөгий",
      description: "Хичээнгүй",
      bgColor: "bg-blue-200",
    },
    {
      icon: "/stickers/toast.png",
      title: "Найрсаг найз",
      description: "Эелдэг нөхөрсөг",
      bgColor: "bg-yellow-200",
    },
    {
      icon: "/stickers/wreath.png",
      title: "Алтан од",
      description: "Шилдэг сурагч",
      bgColor: "bg-green-200",
    },
    {
      icon: "/stickers/helper.png",
      title: "Бяцхан туслагч",
      description: "Үргэлж тусална",
      bgColor: "bg-violet-200",
    },
    {
      icon: "/stickers/speech.png",
      title: "Анхааралтай сурагч",
      description: "Анхааралтай сонсогч",
      bgColor: "bg-red-300",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto font-sans">
      <h2 className="text-center text-lg font-light text-[#6B5AED] dark:text-white mb-4">
        🏅 Миний шагналууд
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-tr from-[#FDF2F8] to-[#E0E7FF] dark:from-[#312E81] dark:to-[#1E1B4B] rounded-3xl shadow-lg p-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 rounded-full ${achievement.bgColor} flex items-center justify-center shadow-lg`}
              >
                <img
                  src={achievement.icon}
                  alt={achievement.title}
                  className="w-10 h-10"
                />
              </div>
              <p className="text-sm font-semibold mt-2 text-gray-800 dark:text-white">
                {achievement.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}