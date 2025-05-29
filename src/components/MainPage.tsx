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

export const MainPage = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: <Trophy className="w-5 h-5" />, text: "Rank систем" },
    { icon: <Award className="w-5 h-5" />, text: "Achievement" },
    { icon: <MessageSquare className="w-5 h-5" />, text: "Шууд чат" },
    { icon: <BarChart2 className="w-5 h-5" />, text: "Leaderboard" },
  ];

  return (
    <div className="my-5 mt-15">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-700
          ${
            scrolled ? "bg-[#8ED6F0]" : "bg-[#8ED6F0]"
          } dark:bg-gradient-to-br dark:from-[#2C3A4A] dark:to-[#1A2636]`}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[#FFE866]/20 blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -right-20 bottom-0 w-72 h-72 rounded-full bg-[#FF9C42]/20 blur-xl"
        />

        <div className="absolute bottom-0 left-0 right-0 h-24 "></div>

        <div className="container mx-auto px-4 py-16 z-10 dark:bg-[#2C3A4A]/80 rounded-lg shadow-2xl backdrop-blur-md m-8 border-2 border-[#FFE866]/30">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 p-9">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md lg:max-w-lg"
            >
              <div className="absolute -z-10 w-full h-full rounded-full bg-[#FFE866]/30 blur-md scale-90" />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="relative overflow-hidden rounded-full border-4 border-[#FF9C42] shadow-2xl"
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
                  } bg-[#B077E0] p-2 rounded-full shadow-lg`}
                >
                  <Star className="w-6 h-6 text-[#FFE866]" />
                </motion.div>
              ))}
            </motion.div>

            {/* Content */}
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9C42] rounded-full shadow-md"
              >
                <Rocket className="w-4 h-4 text-[#2C3A4A]" />
                <span className="text-sm font-light text-[#2C3A4A]">
                  🚀 Хувилбар 1.0
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                <span className="text-[#2C3A4A] dark:text-[#FFD3A1]">
                  ClassHero
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#FF9C42] to-[#B077E0] bg-clip-text text-transparent">
                  Ангийн баатар бол!
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#2C3A4A] dark:text-[#FFD3A1]/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Сурагч бүр өдөр тутмын үйлдлээрээ оноо цуглуулж, шагнал аван
                урамшдаг. Багш нар хичээлээ илүү хөгжилтэй, үр дүнтэй болгох
                боломжтой!
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 max-w-2xl mx-auto lg:mx-0">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="flex flex-col items-center gap-2 bg-white/80 dark:bg-[#2C3A4A]/80 rounded-lg border border-[#FFE866]/30 shadow-sm h-25 w-25 ">
                      <div className="text-[#B077E0] dark:text-[#FF9C42]">
                        {feature.icon}
                      </div>
                      <span className="text-sm  font-light text-[#2C3A4A] dark:text-[#FFD3A1]">
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
                <Button className="border-2 border-white text-[#2C3A4A]  px-8 py-4 rounded-full text-lg font-light shadow-lg transition-all hover:bg-amber-500/80 hover:scale-105 hover:text-white hover:border-white bg-amber-200 dark:text-black ">
                  Демо үзэх
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#FF9C42] text-[#2C3A4A] dark:text-[#FFD3A1] px-8 py-4 rounded-full text-lg font-light shadow-lg transition-all hover:bg-amber-500/80 hover:scale-105 hover:text-white hover:border-white"
                >
                  Бүртгүүлэх
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
