"use client";

import { motion } from "framer-motion";
import { Trophy, User, CalendarCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function StudentHomePage() {
    return (
        <main className="pl-26 px-5 min-h-screen bg-gradient-to-br from-[#F5F6FA] to-[#E0E7FF] dark:from-[#121220] dark:to-[#1E1B4B] py-10 flex flex-col gap-8">
            {/* Header */}
            <div className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-extrabold text-[#6B5AED] dark:text-white"
                >
                    Welcome back, Hero! 🎉
                </motion.h1>
                <p className="text-gray-600 dark:text-gray-300">Let’s make today legendary.</p>
            </div>

            {/* Profile & Character */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl col-span-2"
                >
                    <div className="flex items-center gap-4">
                        <Image
                            src="/student-avatar.png"
                            alt="Student"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                        <div>
                            <h2 className="text-lg font-light text-[#6B5AED] dark:text-white">Nomin Erdene</h2>
                            <p className="text-gray-500 dark:text-gray-300">Level 7 • Class A</p>
                        </div>
                    </div>
                </motion.div>

                {/* Choose Character */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center"
                >
                    <Sparkles className="w-8 h-8 text-[#6B5AED] mb-2" />
                    <p className="font-semibold text-gray-700 dark:text-white mb-2">Customize Your Hero</p>
                    <Button variant="outline" className="border-[#6B5AED] text-[#6B5AED]">Choose Character</Button>
                </motion.div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <SummaryCard icon={CalendarCheck} title="My Attendance" value="92%" />
                <SummaryCard icon={Trophy} title="Leaderboard Rank" value="#4 in Class" />
                <SummaryCard icon={User} title="Achievements" value="12 badges" />
            </div>
        </main>
    );
}

function SummaryCard({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl flex items-center gap-4"
        >
            <div className="bg-[#6B5AED]/10 dark:bg-white/10 p-3 rounded-full">
                <Icon className="w-6 h-6 text-[#6B5AED]" />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
                <h3 className="text-lg font-light text-[#6B5AED] dark:text-white">{value}</h3>
            </div>
        </motion.div>
    );
}
