"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStudentStore } from "@/hooks/useStudentStore"
import Image from "next/image"

const characters = [
  {
    id: "knight",
    name: "Knight Hero",
    image: "/level1.png",
    description: "Brave and strong, protects classmates",
    unlocked: true,
  },
  {
    id: "wizard",
    name: "Wizard Scholar",
    image: "/level2.png",
    description: "Wise and intelligent, loves learning",
    unlocked: true,
  },
  {
    id: "archer",
    name: "Archer Explorer",
    image: "/level3.png",
    description: "Quick and precise, always on target",
    unlocked: true,
  },
  {
    id: "ninja",
    name: "Ninja Stealth",
    image: "/level4.png",
    description: "Silent and focused, masters any skill",
    unlocked: false,
    requiredLevel: 5,
  },
  {
    id: "dragon",
    name: "Dragon Master",
    image: "/placeholder.svg?height=120&width=120",
    description: "Legendary and powerful, ultimate hero",
    unlocked: false,
    requiredLevel: 10,
  },
  {
    id: "phoenix",
    name: "Phoenix Rising",
    image: "/placeholder.svg?height=120&width=120",
    description: "Reborn from challenges, never gives up",
    unlocked: false,
    requiredLevel: 15,
  },
]

interface CharacterSelectorProps {
  onClose: () => void
}

export default function CharacterSelector({ onClose }: CharacterSelectorProps) {
  const { student, updateStudent } = useStudentStore()
  const [selectedCharacter, setSelectedCharacter] = useState(student?.character || "knight")

  const handleSave = () => {
    updateStudent({ character: selectedCharacter })
    onClose()
  }

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
          className="bg-white dark:bg-[#1f1d42] rounded-3xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#6B5AED] dark:text-white">Choose Your Character</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {characters.map((character) => (
              <motion.div
                key={character.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedCharacter === character.id
                  ? "border-[#6B5AED] bg-[#6B5AED]/10"
                  : "border-gray-200 dark:border-gray-700 hover:border-[#6B5AED]/50"
                  } ${!character.unlocked ? "opacity-60" : ""}`}
                onClick={() => character.unlocked && setSelectedCharacter(character.id)}
              >
                {selectedCharacter === character.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#6B5AED] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {!character.unlocked && (
                  <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                    <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                      Level {character.requiredLevel} Required
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{character.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{character.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-[#6B5AED] hover:bg-[#5A4BC4]">
              Save Character
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
