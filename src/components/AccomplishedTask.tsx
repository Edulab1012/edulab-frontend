"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { TiBookmark, TiKeyboard, TiDatabase, TiGroupOutline } from "react-icons/ti";

const taskData = [
  {
    id: 1,
    img_url: "/point.png",
    title: "Оноо цуглуулах",
    content_title: "Өдөр тутмын үйлдлээрээ оноо ав!",
    content: [
      { id: 1, option: "Багшийн өгсөн даалгаврыг биелүүл" },
      { id: 2, option: "Хичээлд идэвхтэй оролцсон бол +3 оноо" },
    ],
    content_p:
      "ClassHero систем нь сурагч бүрийг өдөр бүр урамшуулж, амжилт руу хөтөлдөг!",
    icon: TiDatabase
  },
  {
    id: 2,
    img_url: "/achievement.png",
    title: "Цол авах",
    content_title: "Амжилтаа тэмдэглэ!",
    content: [
      { id: 1, option: "Top сурагч болж badge ав" },
      { id: 2, option: "Тогтмол оролцсон бол урамшуулалтай" },
    ],
    content_p:
      "Тоглолт шиг сонирхолтой badge систем нь сурагчдад хүч өгөх зорилготой!",
    icon: TiBookmark
  },
  {
    id: 3,
    img_url: "/chat.png",
    title: "Анги чат",
    content_title: "Ангийнхантайгаа холбогдоорой",
    content: [
      { id: 1, option: "Чат өрнүүл" },
      { id: 2, option: "Broadcast-оор багшийн зар ав" },
    ],
    content_p:
      "Анги доторх харилцааг сонирхолтой, шуурхай болгоно.",
    icon: TiKeyboard
  },
  {
    id: 4,
    img_url: "/leaderboard.png",
    title: "Leaderboard",
    content_title: "Өрсөлд, ахиц гарга!",
    content: [
      { id: 1, option: "Топ 5 сурагчийн жагсаалт" },
      { id: 2, option: "Багийн амжилтыг харуулна" },
    ],
    content_p:
      "Ангийн уур амьсгалыг хөгжөөнт тэмцээн шиг болгоно!",
    icon: TiGroupOutline
  },
];

export default function FeatureSelector() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [selectedTask, setSelectedTask] = useState(taskData[0]);

  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 60, opacity: 0 });
    }
  }, [isInView, controls]);

  return (
    <div
      className="w-full min-h-screen py-9 px-4 sm:px-8 bg-[#F3F4F6] dark:bg-[#1E2636] flex items-center justify-center"
      ref={ref}
    >
      <motion.div
        animate={controls}
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full max-w-5xl bg-white dark:bg-[#2C3A4A] rounded-3xl p-3 sm:p-6 shadow-xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {taskData.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedTask(item)}
              className={`flex flex-col items-center justify-center rounded-2xl aspect-square transition-all w-full h-full ${selectedTask.id === item.id
                ? "bg-[#FF9C42] dark:bg-[#e1aa77] shadow-lg"
                : "bg-[#EAEFEF] dark:bg-[#5bcfd3]"
                }`}
            >
              <div className="w-15">

                {<item.icon className="w-full h-full" />}



              </div>
              <span
                className={`text-sm font-semibold text-center ${selectedTask.id === item.id
                  ? "text-white"
                  : "text-[#2C3A4A] dark:text-[#FFD3A1]"
                  }`}
              >
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-[#2C3A4A] rounded-2xl p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center lg:justify-start bg"
          >
            <div className="relative w-90 h-50  lg:w-48 lg:h-48 bg-[#EAEFEF] dark:bg-[#7F8CAA] rounded-xl p-4 border-2 border-[#FFE866]">
              <Image
                src={selectedTask.img_url}
                fill
                alt={selectedTask.title}
                className="object-cover p-2 rounded-2xl "
              />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl lg:text-3xl font-light text-[#2C3A4A] dark:text-[#FFD3A1] mb-3 sm:mb-4"
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
                <div
                  key={item.id}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-[#FFE866] dark:text-[#FF9C42] flex-shrink-0" />
                  <p className="text-sm sm:text-base text-[#2C3A4A] dark:text-[#EAEFEF] ">
                    {item.option}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-[#2C3A4A] dark:text-[#EAEFEF]/90"
            >
              {selectedTask.content_p}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}