"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, CalendarCheck, Sparkles, Star, Award } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useStudentStore } from "@/hooks/useStudentStore"

import { usePointsStore } from "@/hooks/usePointsStore"
import CharacterSelector from "./character-selector"
import AchievementModal from "./achievement-modal"
import { useExistingUserStore } from "@/hooks/existingUser"

export default function StudentHomePage() {
  const user = useExistingUserStore((state) => state.user)
  const student = useStudentStore((state) => state.student)
  const { points, level, rank, attendance, achievements } = usePointsStore()

  const [showCharacterSelector, setShowCharacterSelector] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)

  const displayName =
    user?.username || (student ? `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim() : "Hero")
  const grade = student?.grade || "1A"
  const avatarUrl = student?.avatarUrl || "/placeholder.svg?height=60&width=60"

  const summaryData = [
    {
      icon: CalendarCheck,
      title: "My Attendance",
      value: `${attendance}%`,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      icon: Trophy,
      title: "Class Rank",
      value: `#${rank}`,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      icon: Award,
      title: "Achievements",
      value: `${achievements.length} badges`,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

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
          Welcome back, {displayName}! 🎉
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300">Let's make today legendary.</p>
      </div>

      {/* Profile & Character */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl col-span-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={avatarUrl || "/placeholder.svg"}
                  alt="Student"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-[#6B5AED]"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#6B5AED] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {level}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#6B5AED] dark:text-white">{displayName}</h2>
                <p className="text-gray-500 dark:text-gray-300">
                  Level {level} • Class {grade}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{points} XP</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Progress to Level {level + 1}</p>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6B5AED] to-purple-500 transition-all duration-500"
                  style={{ width: `${points % 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Choose Character */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-[#6B5AED] mb-2" />
          <p className="font-semibold text-gray-700 dark:text-white mb-2 text-center">Customize Your Hero</p>
          <Button
            variant="outline"
            className="border-[#6B5AED] text-[#6B5AED] hover:bg-[#6B5AED] hover:text-white"
            onClick={() => setShowCharacterSelector(true)}
          >
            Choose Character
          </Button>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
            color={item.color}
            bgColor={item.bgColor}
            onClick={item.title === "Achievements" ? () => setShowAchievements(true) : undefined}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl">
          <h3 className="text-lg font-semibold text-[#6B5AED] dark:text-white mb-4">Daily Challenges</h3>
          <div className="space-y-3">
            <ChallengeItem title="Complete 3 assignments" progress={2} total={3} points={50} />
            <ChallengeItem title="Attend all classes" progress={4} total={5} points={30} />
            <ChallengeItem title="Help a classmate" progress={0} total={1} points={25} />
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl">
          <h3 className="text-lg font-semibold text-[#6B5AED] dark:text-white mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-white text-sm">{achievement.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                </div>
              </div>
            ))}
            {achievements.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No achievements yet. Keep working!</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {showCharacterSelector && <CharacterSelector onClose={() => setShowCharacterSelector(false)} />}

      {showAchievements && <AchievementModal onClose={() => setShowAchievements(false)} />}
    </main>
  )
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  color = "text-[#6B5AED]",
  bgColor = "bg-[#6B5AED]/10 dark:bg-white/10",
  onClick,
}: {
  icon: any
  title: string
  value: string
  color?: string
  bgColor?: string
  onClick?: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-white dark:bg-[#1f1d42] p-6 rounded-3xl shadow-xl flex items-center gap-4 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className={`${bgColor} p-3 rounded-full`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <h3 className={`text-lg font-semibold ${color} dark:text-white`}>{value}</h3>
      </div>
    </motion.div>
  )
}

function ChallengeItem({
  title,
  progress,
  total,
  points,
}: { title: string; progress: number; total: number; points: number }) {
  const { addPoints } = usePointsStore()
  const isCompleted = progress >= total

  const handleComplete = () => {
    if (!isCompleted) {
      addPoints(points)
    }
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="flex-1">
        <p className="font-medium text-gray-700 dark:text-white text-sm">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6B5AED] transition-all duration-300"
              style={{ width: `${(progress / total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {progress}/{total}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-[#6B5AED] font-medium">+{points} XP</p>
        {isCompleted && (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mt-1">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
    </div>
  )
}
