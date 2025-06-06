"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Trophy, Star, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePointsStore } from "@/hooks/usePointsStore"

interface AchievementModalProps {
  onClose: () => void
}

export default function AchievementModal({ onClose }: AchievementModalProps) {
  const { achievements } = usePointsStore()

  const allAchievements = [
    {
      id: "first_day",
      name: "First Day Hero",
      description: "Complete your first day of school",
      icon: Star,
      points: 50,
      unlocked: achievements.some((a) => a.id === "first_day"),
    },
    {
      id: "perfect_attendance",
      name: "Perfect Attendance",
      description: "Attend all classes for a week",
      icon: Trophy,
      points: 100,
      unlocked: achievements.some((a) => a.id === "perfect_attendance"),
    },
    {
      id: "helpful_hero",
      name: "Helpful Hero",
      description: "Help 5 classmates with their work",
      icon: Award,
      points: 75,
      unlocked: achievements.some((a) => a.id === "helpful_hero"),
    },
    {
      id: "assignment_master",
      name: "Assignment Master",
      description: "Complete 10 assignments perfectly",
      icon: Target,
      points: 150,
      unlocked: achievements.some((a) => a.id === "assignment_master"),
    },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-[#1f1d42] rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#6B5AED] dark:text-white">My Achievements</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {allAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-2xl border-2 ${
                  achievement.unlocked
                    ? "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      achievement.unlocked ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <achievement.icon
                      className={`w-6 h-6 ${achievement.unlocked ? "text-yellow-600" : "text-gray-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        achievement.unlocked
                          ? "text-yellow-800 dark:text-yellow-200"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {achievement.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        achievement.unlocked
                          ? "text-yellow-700 dark:text-yellow-300"
                          : "text-gray-500 dark:text-gray-500"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${achievement.unlocked ? "text-yellow-600" : "text-gray-400"}`}>
                      +{achievement.points} XP
                    </p>
                    {achievement.unlocked && <p className="text-xs text-green-600">Unlocked!</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {achievements.length} of {allAchievements.length} achievements unlocked
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
