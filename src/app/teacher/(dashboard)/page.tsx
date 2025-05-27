"use client";
import { motion } from "framer-motion";
import TeacherHome from "./home/page";
import { useRef } from "react";
export default function TeacherMainPage() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={constraintsRef}
      className="p-10  bg-teal-400 min-h-screen space-y-8 "
    >
      <TeacherHome></TeacherHome>
    </motion.div>
  );
}
