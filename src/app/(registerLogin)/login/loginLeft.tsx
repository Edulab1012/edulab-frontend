"use client";

import { BookCheck, PanelTop, Backpack } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function LoginDecor() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`relative w-full h-auto rounded-3xl ml-5 overflow-hidden border-r-4 ${
        theme === "dark"
          ? "bg-[#121220] border-r-[#6B5AED]"
          : "bg-[#F5F6FA] border-r-[#1DA1F2]"
      } shadow-xl`}
      style={{
        backgroundImage: "url('/loginImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-black/60" : "bg-white/60"
          } backdrop-blur-sm z-0 rounded-xl`}
        />

        <div className="flex items-center gap-3 mb-6 z-10">
          <div
            className={`p-3 rounded-xl ${
              theme === "dark"
                ? "bg-[#6B5AED] text-white"
                : "bg-[#1DA1F2] text-white"
            } shadow-md`}
          >
            <BookCheck className="w-6 h-6" />
          </div>
          <div
            className={`p-3 rounded-xl ${
              theme === "dark"
                ? "bg-[#6B5AED] text-white"
                : "bg-[#1DA1F2] text-white"
            } shadow-md`}
          >
            <PanelTop className="w-6 h-6" />
          </div>
          <div
            className={`p-3 rounded-xl ${
              theme === "dark"
                ? "bg-[#6B5AED] text-white"
                : "bg-[#1DA1F2] text-white"
            } shadow-md`}
          >
            <Backpack className="w-6 h-6" />
          </div>
        </div>

        <h1
          className={`text-3xl md:text-4xl font-light drop-shadow-sm text-center mt-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          } p-4 rounded-3xl`}
        >
          ClassHero-д тавтай морил!
        </h1>
        <p
          className={`mt-4 max-w-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Хичээл бүрийг хөгжилтэй, урамтай, хамтдаа!
        </p>
      </div>
    </div>
  );
}
