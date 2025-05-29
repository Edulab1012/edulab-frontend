"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, PhoneCall, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "circInOut" }}
        className={`
        fixed top-0 left-0 right-0 z-50 w-full
        flex justify-between items-center px-4 sm:px-8 py-3
        transition-all duration-300 ease-in-out 
        ${scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
            : "bg-white dark:bg-gray-900"
          }
        border-b border-gray-200 dark:border-gray-700
      `}
      >
        <Link href="/" className="absolute m-10 ">
          <Image
            src={theme === "dark" ? "/classheroNoback.png" : "/classheroNoback.png"}
            alt="logo"
            width={200}
            height={200}
            className="w-auto h-30 sm:h-25 dark:invert "
            style={{ width: "auto", height: "90px" }}
            priority
          />
        </Link>
        <div></div>
        <div className="flex items-center gap-2 sm:gap-4 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-md">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>


        </div>
      </motion.header>
    </header>
  );
};