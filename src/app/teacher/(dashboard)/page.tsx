"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Class from "./allclass/Class";
import AddClass from "./allclass/AddClass";
export default function TeacherMainPage() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={constraintsRef}
      className=" bg-[#8ED6F0] sm:bg-green-400 md:bg-red-400 lg:bg-amber-400 xl:bg-pink-500 dark:bg-gradient-to-br dark:from-[#2C3A4A] dark:to-[#1A2636] "
    >
      <motion.div
        className="flex flex-col items-center h-full mt-[120px]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-[#2C3A4A] dark:text-white mb-10">
          Миний ангиуд
        </h1>
        <motion.div className="flex flex-col gap-4 lg:flex-row  lg:mr-8">
          <motion.div className="grid grid-cols-2 gap-2">
            <Class />
            <Class />
          </motion.div>
          <motion.div>
            <AddClass></AddClass>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
