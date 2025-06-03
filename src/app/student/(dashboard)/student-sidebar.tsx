"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import {
  BookCheck,
  Home,
  Brush,
  Trophy,
  NotebookPen,
  DoorClosed as CloseIcon,
  ChevronLeft,
  ChevronRight,
  MessagesSquare
} from "lucide-react"

interface MenuItem {
  title: string
  url: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const menuItems: MenuItem[] = [
  { title: "Нүүр", url: "/student", icon: Home },
  { title: "Профайл", url: "/student/accountProfile", icon: Brush },
  { title: "broadcast room", url: "/student/broadcast", icon: MessagesSquare },
  { title: "leaderboard", url: "/student/leaderboard", icon: Trophy },
  { title: "planner", url: "/student/planner", icon: NotebookPen },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isFolded, setIsFolded] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 80 })
  const [isDragging, setIsDragging] = useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement
    if (!target.dataset.drag) return
    e.preventDefault()

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    setIsDragging(true)
    const offsetX = clientX - position.x
    const offsetY = clientY - position.y

    const onMove = (ev: MouseEvent | TouchEvent) => {
      const x = "touches" in ev ? ev.touches[0].clientX : ev.clientX
      const y = "touches" in ev ? ev.touches[0].clientY : ev.clientY
      setPosition({ x: x - offsetX, y: y - offsetY })
    }

    const onEnd = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onEnd)
      document.removeEventListener("touchmove", onMove)
      document.removeEventListener("touchend", onEnd)
    }

    document.addEventListener("mousemove", onMove, { passive: false })
    document.addEventListener("mouseup", onEnd)
    document.addEventListener("touchmove", onMove, { passive: false })
    document.addEventListener("touchend", onEnd)
  }

  return (
    <div>
      <button
        className="fixed top-[15%] left-4 z-55 p-2 rounded-full bg-[#6B5AED] text-white shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          ref={sidebarRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          data-drag
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            transition: isDragging ? "none" : "transform 0.2s ease-in-out",
          }}
          className={`fixed z-40 rounded-3xl border-r-4 flex flex-col items-center mt-[10%]
            ${theme === "dark" ? "bg-[#121220] border-r-[#6B5AED]" : "bg-[#F5F6FA] border-r-[#1DA1F2]"}
            ${isFolded ? "w-20" : "w-64"}
            shadow-xl transition-all duration-200`}
        >
          <button
            onClick={() => setIsFolded(!isFolded)}
            className={`absolute -right-4 top-[45%] z-50 bg-white dark:bg-gray-800 border-2 rounded-full p-1.5 shadow-lg
              hover:scale-110 active:scale-95 transition-transform duration-200
              ${theme === "dark" ? "border-[#6B5AED]" : "border-[#1DA1F2]"}`}
          >
            {isFolded ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>

          <nav className={`flex flex-col space-y-2 w-full px-2 py-6 ${isFolded ? "items-center" : "px-4"}`}>
            {menuItems.map((item) => (
              <Link key={item.title} href={item.url}>
                <div
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 w-full
                    hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden
                    ${pathname === item.url
                      ? "text-white bg-gradient-to-r from-[#6B5AED] to-purple-600 shadow-md"
                      : theme === "dark"
                        ? "text-white hover:bg-[#6B5AED]/20"
                        : "text-black hover:bg-[#1DA1F2]/10"}
                    ${isFolded ? "justify-center" : ""}`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isFolded && <span className="text-sm font-medium">{item.title}</span>}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}