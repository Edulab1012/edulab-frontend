"use client";

import {
  Timer,
  Users,
  Music,
  Volume2,
  CalendarDays,
  Shuffle,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
const tools = [
  {
    icon: <Timer className="text-blue-500 w-5 h-5" />,
    title: "Цаг хэмжигч",
    desc: "Үйл ажиллагааны хугацааг хянах",
  },
  {
    icon: <Users className="text-green-500 w-5 h-5" />,
    title: "Бүлэг үүсгэгч",
    desc: "Сурагчдыг санамсаргүй бүлэглэх",
  },
  {
    icon: <Music className="text-purple-500 w-5 h-5" />,
    title: "Ангийн хөгжим",
    desc: "Ажлын уур амьсгалыг бүрдүүлэх",
  },
  {
    icon: <Volume2 className="text-yellow-500 w-5 h-5" />,
    title: "Дуу чимээ хэмжигч",
    desc: "Ангийн дуу чимээг хянах",
  },
  {
    icon: <CalendarDays className="text-red-500 w-5 h-5" />,
    title: "Өнөөдөр",
    desc: "Өдрийн мэдэгдэл, мэдээлэл",
  },
  {
    icon: <Shuffle className="text-pink-500 w-5 h-5" />,
    title: "Санамсаргүй сонголт",
    desc: "Сурагчдыг санамсаргүй сонгох",
  },
  {
    icon: <ClipboardList className="text-indigo-500 w-5 h-5" />,
    title: "Чиглэл",
    desc: "Үйл ажиллагааны зааварчилгаа",
  },
  {
    icon: <MessageSquare className="text-teal-500 w-5 h-5" />,
    title: "Бодож, хуваалцах",
    desc: "Сурагчдын хосоор ярилцах",
  },
];

export default function SectionTool() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={constraintsRef}
      className="grid grid-cols-4 gap-6 items-center justify-center bg-blue-400 border-2 rounded-2xl mt-[140px] py-[30px] px-[80px] "
    >
      {tools.map((tool, index) => (
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={1}
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          className="w-[200px] h-[200px] rounded-full bg-white hover:transform hover:-translate-y-1 shadow-sm transition-all cursor-pointer flex flex-col justify-center items-center gap-3 active:bg-teal-400 active:border-4 active:border-white"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            {tool.icon}
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-700">
              {tool.title}
            </div>
            <div className="text-xs text-gray-500 w-[140px]">{tool.desc}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
