"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

interface XpRewardAnimationProps {
  xpAmount: number
  message?: string
  onComplete?: () => void
  duration?: number
}

export default function XpRewardAnimation({
  xpAmount,
  message = "XP авлаа!",
  onComplete,
  duration = 2000,
}: XpRewardAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-50"></div>
              <Sparkles className="h-6 w-6 text-yellow-300 relative z-10" />
            </div>
            <div>
              <div className="font-bold text-xl">+{xpAmount} XP</div>
              <div className="text-sm text-green-100">{message}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
