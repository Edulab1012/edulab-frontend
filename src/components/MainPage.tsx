"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Trophy,
  MessageSquare,
  BarChart2,
  Award,
  Star,
  Rocket,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import RegisterButton from "./RegisterButton";
import { useTheme } from "next-themes";

export const MainPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: <Trophy className="w-5 h-5" />, text: "Rank систем" },
    { icon: <Award className="w-5 h-5" />, text: "Achievement" },
    { icon: <MessageSquare className="w-5 h-5" />, text: "Шууд чат" },
    { icon: <BarChart2 className="w-5 h-5" />, text: "Leaderboard" },
  ];

  if (!mounted) return null;

  return (
    <div className="my-5 mt-15">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-700 ${
          theme === "dark"
            ? "bg-gradient-to-br from-[#121220] to-[#1A1A2E]"
            : "bg-gradient-to-br from-[#F5F6FA] to-[#E6E9F4]"
        }`}
      >
        {/* Background elements */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className={`absolute -left-20 -top-20 w-64 h-64 rounded-full ${
            theme === "dark" ? "bg-[#6B5AED]/20" : "bg-[#1DA1F2]/20"
          } blur-xl`}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className={`absolute -right-20 bottom-0 w-72 h-72 rounded-full ${
            theme === "dark" ? "bg-[#6B5AED]/20" : "bg-[#1DA1F2]/20"
          } blur-xl`}
        />

        <div className="container mx-auto px-4 py-16 z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 p-9">
            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md lg:max-w-lg"
            >
              <div
                className={`absolute -z-10 w-full h-full rounded-full ${
                  theme === "dark" ? "bg-[#6B5AED]/30" : "bg-[#1DA1F2]/30"
                } blur-md scale-90`}
              />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className={`relative overflow-hidden rounded-3xl ${
                  theme === "dark"
                    ? "border-4 border-[#6B5AED]"
                    : "border-4 border-[#1DA1F2]"
                } shadow-2xl`}
              >
                <Image
                  alt="ClassHero character"
                  src="/landingImage.png"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>

              {/* Floating stars */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className={`absolute ${
                    i === 1
                      ? "-top-5 -left-5"
                      : i === 2
                      ? "-bottom-5 -right-5"
                      : "top-1/4 -right-8"
                  } ${
                    theme === "dark" ? "bg-[#6B5AED]" : "bg-[#1DA1F2]"
                  } p-2 rounded-full shadow-lg`}
                >
                  <Star className="w-6 h-6 text-[#FFE866]" />
                </motion.div>
              ))}
            </motion.div>

            {/* Content section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`inline-flex items-center gap-2 px-4 py-2 ${
                  theme === "dark" ? "bg-[#6B5AED]" : "bg-[#1DA1F2]"
                } rounded-full shadow-md`}
              >
                <Rocket className="w-4 h-4 text-white" />
                <span className="text-sm font-light text-white">
                  🚀 Хувилбар 1.0
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                <span
                  className={theme === "dark" ? "text-white" : "text-[#1E2636]"}
                >
                  ClassHero
                </span>
                <br />
                <span
                  className={`bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-[#6B5AED] to-[#B077E0]"
                      : "from-[#1DA1F2] to-[#5bcfd3]"
                  } bg-clip-text text-transparent`}
                >
                  Ангийн баатар бол!
                </span>
              </h1>

              <p
                className={`text-lg md:text-xl ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } leading-relaxed max-w-2xl mx-auto lg:mx-0`}
              >
                Сурагч бүр өдөр тутмын үйлдлээрээ оноо цуглуулж, шагнал аван
                урамшдаг. Багш нар хичээлээ илүү хөгжилтэй, үр дүнтэй болгох
                боломжтой!
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 max-w-2xl mx-auto lg:mx-0 justify-items-center">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card
                      className={`flex flex-col items-center gap-2 ${
                        theme === "dark" ? "bg-[#1E1E2D]" : "bg-white"
                      } rounded-xl ${
                        theme === "dark"
                          ? "border-[#6B5AED]/50"
                          : "border-[#1DA1F2]/50"
                      } shadow-sm h-25 w-25 hover:scale-[1.03] transition-all`}
                    >
                      <div
                        className={
                          theme === "dark" ? "text-[#6B5AED]" : "text-[#1DA1F2]"
                        }
                      >
                        {feature.icon}
                      </div>
                      <span
                        className={`text-sm font-light ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <Button
                  onClick={() => (window.location.href = "/login")}
                  className={`px-8 py-4 rounded-xl text-lg font-light shadow-lg transition-all hover:scale-105 ${
                    theme === "dark"
                      ? "bg-[#6B5AED] hover:bg-[#7C6BED] text-white"
                      : "bg-[#1DA1F2] hover:bg-[#2DA1F2] text-white"
                  }`}
                >
                  Нэвтрэх
                </Button>

                <RegisterButton />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
