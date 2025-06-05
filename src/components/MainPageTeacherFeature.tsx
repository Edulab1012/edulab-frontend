"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  MdOutlineEventAvailable,
  MdOutlineSchool,
  MdOutlineChat,
  MdOutlineEmojiEvents,
} from "react-icons/md";

const teacherFeatures = [
  {
    id: 1,
    img_url: "/leaderboard.png",
    title: "Ирц бүртгэх",
    content_title: "Сурагчдын ирцийг хялбар тэмдэглэ!",
    content: [
      { id: 1, option: "Анги тус бүрийн ирцийг нэг товчоор бүртгэнэ" },
      { id: 2, option: "Хугацаанд суурилсан бүртгэл" },
    ],
    content_p:
      "Ирц бүртгэл автоматжуулснаар цаг хэмнэж, ангийн хандалтыг хянах боломжтой.",
    icon: MdOutlineEventAvailable,
  },
  {
    id: 2,
    img_url: "/leaderboard.png",
    title: "Багшийн хэрэгсэл",
    content_title: "Хичээл удирдах ухаалаг хэрэгсэл",
    content: [
      { id: 1, option: "Хичээлийн хуваарь зохион байгуулах" },
      { id: 2, option: "Шалгалтын оноо оруулах" },
    ],
    content_p:
      "Бүх хэрэгцээт функцүүдийг нэг дор төвлөрүүлж, багшийн ажлыг хөнгөвчилнө.",
    icon: MdOutlineSchool,
  },
  {
    id: 3,
    img_url: "/leaderboard.png",
    title: "Харилцах",
    content_title: "Сурагчидтай холбогдох",
    content: [
      { id: 1, option: "Чат болон broadcast зарлал илгээх" },
      { id: 2, option: "Ангийн чат орчин удирдах" },
    ],
    content_p:
      "Сургалтын явцад багш сурагчдын хооронд шуурхай, энгийн харилцаа бий болгоно.",
    icon: MdOutlineChat,
  },
  {
    id: 4,
    img_url: "/leaderboard.png",
    title: "Амжилт урамшуулах",
    content_title: "Сурагчдаа шагнаж, идэвхжүүл!",
    content: [
      { id: 1, option: "Badge болон оноо өгөх" },
      { id: 2, option: "Урамшууллын систем удирдах" },
    ],
    content_p:
      "Амжилтыг хүлээн зөвшөөрөх нь сурагчдыг идэвхтэй оролцоход түлхэц болдог.",
    icon: MdOutlineEmojiEvents,
  },
];

export default function TeacherFeatureSelector() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [selectedTask, setSelectedTask] = useState(teacherFeatures[0]);
  const { theme } = useTheme();
  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 60, opacity: 0 });
    }
  }, [isInView, controls]);

  return (
    <div
      className="w-full min-h-screen py-9 px-4 sm:px-8 bg-gradient-to-br from-[#F5F6FA] to-[#E0E7FF] dark:from-[#121220] dark:to-[#1E1B4B] flex items-center justify-center relative mt-30"
      ref={ref}
    >
      <h1
        className={`bg-gradient-to-r ${
          theme === "dark"
            ? "from-[#6B5AED] to-[#B077E0]"
            : "from-[#1DA1F2] to-[#5bcfd3]"
        } bg-clip-text text-transparent text-5xl absolute top-[-10%] sm:relative sm:ml-10  w-[400px] `}
      >
        Teacher features
      </h1>

      <motion.div
        animate={controls}
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full max-w-5xl bg-white dark:bg-[#2C3A4A] rounded-3xl p-3 sm:p-6 shadow-xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {teacherFeatures.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedTask(item)}
              className={`flex flex-col items-center justify-center rounded-2xl aspect-square transition-all w-full h-full ${
                selectedTask.id === item.id
                  ? "bg-[#FF9C42] dark:bg-[#e1aa77] shadow-lg"
                  : "bg-[#EAEFEF] dark:bg-[#1f1d42]"
              }`}
            >
              <div className="w-14 h-14 text-black dark:text-[#6B5AED]">
                {<item.icon className="w-full h-full" />}
              </div>
              <span
                className={`text-sm font-semibold text-center ${
                  selectedTask.id === item.id
                    ? "text-white dark:text-[#3e2b22]"
                    : "text-[#3e2b22] dark:text-white"
                }`}
              >
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-[#1f1d42] rounded-2xl p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center lg:justify-start"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[#e3c4be] dark:bg-[#94a18f] rounded-xl p-4 border-2 border-[#e7dbc6]">
              <Image
                src={selectedTask.img_url}
                fill
                alt={selectedTask.title}
                className="object-fill p-2"
              />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-gradient-to-r ${
                theme === "dark"
                  ? "from-[#6B5AED] to-[#B077E0]"
                  : "from-[#1DA1F2] to-[#5bcfd3]"
              } bg-clip-text text-transparent text-xl sm:text-2xl lg:text-3xl font-light mb-3 sm:mb-4`}
            >
              {selectedTask.content_title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 sm:space-y-3 mb-4 sm:mb-6"
            >
              {selectedTask.content.map((item) => (
                <div key={item.id} className="flex items-start gap-2 sm:gap-3">
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[#FFE866] dark:text-[#FF9C42]  flex-shrink-0" />
                  <p className="text-sm sm:text-base text-black dark:text-white">
                    {item.option}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-black dark:text-white"
            >
              {selectedTask.content_p}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
