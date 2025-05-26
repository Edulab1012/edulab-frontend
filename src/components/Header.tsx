"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 100,
        y: 0,
      }}
      transition={{ duration: 0.4, ease: "circInOut" }}
      className={`${
        scrolled
          ? "bg-white/40 backdrop-blur-2xl h-f flex justify-between px-15 py-3 items-center fixed w-screen transition-all duration-400"
          : "bg-white backdrop-blur-2xl h-f flex justify-between px-15 py-3 items-center fixed w-screen transition-all duration-400"
      }`}
    >
      <Link href="/">
        <Image src={"/logo-back.svg"} alt="logo" width={200} height={200} />
      </Link>
      <div className="flex gap-5">
        <Button className=" px-15 py-5 rounded-full bg-teal-400 hover:text-white hover:bg-teal-500 border-2">
          <PhoneCall /> Холбоо барих
        </Button>
        <Link href={"/login"}>
          <Button className=" px-15 py-5 rounded-full bg-blue-400 hover:bg-blue-500 border-2">
            <LogIn />
            Нэвтрэх
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
