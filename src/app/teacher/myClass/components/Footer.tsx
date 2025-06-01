"use client";
import { on } from "events";
import React from "react";

interface FooterProps {
  onSelectSection: (section: "home" | "attendance") => void;
  activeSection: "home" | "attendance";
  markAllPresent?: () => void;
  markAllAbsent?: () => void;
  studentStatus: Record<string, "present" | "late" | "absent" | null>;
  onSubmitAttendance: () => void;
}
function Footer({
  onSelectSection,
  activeSection,
  markAllPresent,
  markAllAbsent,
  studentStatus,
  onSubmitAttendance,
}: FooterProps) {
  return (
    <div className="fixed bottom-0 right-0 left-0 bg-[#2C3A4A]  h-[100px] dark:bg-black  border-t-2 border-t-white flex justify-center items-center">
      <div className="  xl:pl-[340px] lg:pl-[380px] md:pl-[390px] sm:pl-[400px] h-full w-[400px] flex justify-center items-center text-white">
        {activeSection === "home" && (
          <div className="h-full w-[400px] 2xl:w-[800px] xl:w-[700px] lg:w-[500px] md:w-[440px] sm:w-[400px] flex justify-center items-center text-white">
            <button
              onClick={() => onSelectSection("attendance")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[240px] h-full flex items-center justify-center"
            >
              Ирц
            </button>
            <button
              onClick={() => alert("random")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px] w-[220px] h-full flex items-center justify-center"
            >
              Санамсаргүй сонголт
            </button>
            <button
              onClick={() => alert("timer")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Хугацаа хэмжигч
            </button>
            <button
              onClick={() => alert("group")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Бүлэгт хуваах
            </button>
          </div>
        )}
        {activeSection === "attendance" && (
          <div className="h-full w-[400px] 2xl:w-[800px] xl:w-[700px] lg:w-[500px] md:w-[440px] sm:w-[400px] flex justify-center items-center text-white">
            <button
              onClick={markAllPresent}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Бүгд ирсэн
            </button>
            <button
              onClick={markAllAbsent}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Бүгд ирээгүй
            </button>
            <button
              onClick={() => onSelectSection("home")}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Буцах
            </button>
            <button
              onClick={onSubmitAttendance}
              className="text-lg font-semibold hover:bg-white hover:text-black transition-all duration-400 ease-in-out p-[10px]  w-[220px] h-full flex items-center justify-center"
            >
              Ирц баталгаажуулах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
