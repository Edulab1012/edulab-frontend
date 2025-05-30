"use client";
import { motion } from "framer-motion";
import TeacherHome from "./home/page";
import { useRef } from "react";
import AddClass from "../AddClass/AddClass";
export default function TeacherMainPage() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={constraintsRef}
      className="w-screen h-screen bg-[#8ED6F0]  dark:bg-gradient-to-br dark:from-[#2C3A4A] dark:to-[#1A2636] "
    >
      <TeacherHome></TeacherHome>
      <div className="absolute left-[50%] top-20">
        <AddClass></AddClass>
      </div>

    </motion.div>
  );
}
