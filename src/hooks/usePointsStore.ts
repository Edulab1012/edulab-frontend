import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Achievement {
  id: string
  name: string
  description: string
  points: number
  unlockedAt: Date
}

interface PointsStore {
  points: number
  level: number
  rank: number
  attendance: number
  achievements: Achievement[]
  addPoints: (amount: number) => void
  updateAttendance: (percentage: number) => void
  unlockAchievement: (achievement: Omit<Achievement, "unlockedAt">) => void
  calculateLevel: () => number
  calculateRank: () => number
}

export const usePointsStore = create<PointsStore>()(
  persist(
    (set, get) => ({
      points: 250,
      level: 3,
      rank: 4,
      attendance: 92,
      achievements: [
        {
          id: "first_day",
          name: "First Day Hero",
          description: "Complete your first day of school",
          points: 50,
          unlockedAt: new Date(),
        },
      ],

      addPoints: (amount) => {
        const currentPoints = get().points
        const newPoints = currentPoints + amount
        const newLevel = Math.floor(newPoints / 100) + 1

        set({
          points: newPoints,
          level: newLevel,
        })

        // Check for level-based achievements
        if (newLevel > get().level) {
          // Level up achievement logic here
        }
      },

      updateAttendance: (percentage) => {
        set({ attendance: percentage })

        // Check for attendance achievements
        if (percentage >= 100) {
          get().unlockAchievement({
            id: "perfect_attendance",
            name: "Perfect Attendance",
            description: "Attend all classes for a week",
            points: 100,
          })
        }
      },

      unlockAchievement: (achievement) => {
        const achievements = get().achievements
        const alreadyUnlocked = achievements.some((a) => a.id === achievement.id)

        if (!alreadyUnlocked) {
          const newAchievement = {
            ...achievement,
            unlockedAt: new Date(),
          }

          set({
            achievements: [...achievements, newAchievement],
            points: get().points + achievement.points,
          })
        }
      },

      calculateLevel: () => {
        return Math.floor(get().points / 100) + 1
      },

      calculateRank: () => {
        // This would typically be calculated based on comparison with other students
        // For now, we'll use a simple calculation based on points
        const points = get().points
        if (points >= 500) return 1
        if (points >= 400) return 2
        if (points >= 300) return 3
        if (points >= 200) return 4
        return 5
      },
    }),
    {
      name: "student-points-storage",
    },
  ),
)
