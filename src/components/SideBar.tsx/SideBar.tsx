"use client"

import type React from "react"
import {
    MenuIcon,
    DoorClosedIcon as CloseIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useRef, useEffect, useCallback } from "react"

export interface MenuItem {
    title: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface SidebarProps {
    menuItems: MenuItem[]
    defaultPosition?: { x: number; y: number }
}

export function AppSidebar({ menuItems, defaultPosition = { x: 20, y: 80 } }: SidebarProps) {
    const pathname = usePathname()
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(true)
    const [isFolded, setIsFolded] = useState(false)
    const [position, setPosition] = useState(defaultPosition)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const sidebarRef = useRef<HTMLDivElement>(null)
    const animationFrameRef = useRef<number | undefined>(undefined)
    const lastPositionRef = useRef(defaultPosition)

    const updatePosition = useCallback((newPosition: { x: number; y: number }) => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = requestAnimationFrame(() => {
            const sidebar = sidebarRef.current
            if (!sidebar) return
            const rect = sidebar.getBoundingClientRect()
            const maxX = window.innerWidth - rect.width
            const maxY = window.innerHeight - rect.height
            const constrainedPosition = {
                x: Math.max(0, Math.min(maxX, newPosition.x)),
                y: Math.max(0, Math.min(maxY, newPosition.y)),
            }
            setPosition(constrainedPosition)
            lastPositionRef.current = constrainedPosition
        })
    }, [])

    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const target = e.target as HTMLElement
        if (!target.dataset.drag) return
        e.preventDefault()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
        setDragStart({ x: clientX - position.x, y: clientY - position.y })
        setIsDragging(true)
        if (sidebarRef.current) {
            sidebarRef.current.style.cursor = 'grabbing'
            sidebarRef.current.style.userSelect = 'none'
        }
    }, [position])

    const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
        updatePosition({ x: clientX - dragStart.x, y: clientY - dragStart.y })
    }, [isDragging, dragStart, updatePosition])

    const handleDragEnd = useCallback(() => {
        setIsDragging(false)
        if (sidebarRef.current) {
            sidebarRef.current.style.cursor = ''
            sidebarRef.current.style.userSelect = ''
        }
        const snapThreshold = 50
        const sidebar = sidebarRef.current
        if (!sidebar) return
        const rect = sidebar.getBoundingClientRect()
        const newPosition = { ...lastPositionRef.current }
        if (newPosition.x < snapThreshold) newPosition.x = 20
        else if (newPosition.x > window.innerWidth - rect.width - snapThreshold)
            newPosition.x = window.innerWidth - rect.width - 20
        if (newPosition.y < snapThreshold) newPosition.y = 20
        updatePosition(newPosition)
    }, [updatePosition])

    useEffect(() => {
        if (!isDragging) return
        const handleMouseMove = (e: MouseEvent) => handleDragMove(e)
        const handleMouseUp = () => handleDragEnd()
        const handleTouchMove = (e: TouchEvent) => handleDragMove(e)
        const handleTouchEnd = () => handleDragEnd()
        document.addEventListener('mousemove', handleMouseMove, { passive: false })
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleTouchEnd)
        }
    }, [isDragging, handleDragMove, handleDragEnd])

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [])

    return (
        <>
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-full bg-[#6B5AED] text-white shadow-lg hover:shadow-xl transition-all duration-200 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
            {isOpen && (
                <div
                    ref={sidebarRef}
                    style={{
                        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: isDragging ? 'transform' : 'auto',
                    }}
                    className={`fixed z-40 rounded-3xl shadow-2xl border-r-4 flex flex-col items-center py-0 select-none
            ${theme === 'dark' ? 'bg-[#121220] border-r-[#6B5AED]' : 'bg-[#F5F6FA] border-r-[#1DA1F2]'}
            ${isFolded ? 'w-20' : 'w-64'}
            ${isDragging ? 'shadow-3xl scale-105' : 'hover:shadow-xl'}
            transition-all duration-200`}
                >
                    <div
                        data-drag="true"
                        onMouseDown={handleDragStart}
                        onTouchStart={handleDragStart}
                        className={`w-full h-8 rounded-t-3xl cursor-grab active:cursor-grabbing relative overflow-hidden
              ${isDragging ? 'bg-[#6B5AED]' : 'bg-gradient-to-r from-blue-500 to-purple-600'}
              transition-all duration-200`}
                    >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="flex space-x-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 bg-white/60 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        className={`absolute -right-4 top-6 z-50 bg-white dark:bg-gray-800 border-2 rounded-full p-1.5 shadow-lg
              hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95
              ${theme === 'dark' ? 'border-[#6B5AED]' : 'border-[#1DA1F2]'}`}
                        onClick={() => setIsFolded(!isFolded)}
                    >
                        {isFolded ? (
                            <ChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <ChevronLeft className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        )}
                    </button>
                    <nav className={`flex flex-col space-y-2 w-full px-2 py-6 ${isFolded ? 'items-center' : 'px-4'}`}>
                        {menuItems.map((item, index) => (
                            <Link key={item.title} href={item.url}>
                                <div
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 w-full
                    hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden
                    ${pathname === item.url
                                            ? 'text-white bg-gradient-to-r from-[#6B5AED] to-purple-600 shadow-lg'
                                            : theme === 'dark'
                                                ? 'text-white hover:bg-[#6B5AED]/20 hover:shadow-md'
                                                : 'text-black hover:bg-[#1DA1F2]/10 hover:shadow-md'}
                    ${isFolded ? 'justify-center' : ''}
                    ${isDragging ? 'pointer-events-none' : ''}`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                    transform -translate-x-full group-hover:translate-x-full transition-transform duration-700
                    ${pathname === item.url ? 'opacity-30' : 'opacity-0 group-hover:opacity-100'}`}
                                    />
                                    <item.icon
                                        className={`w-5 h-5 relative z-10 transition-transform duration-200
                    ${pathname === item.url ? 'scale-110' : 'group-hover:scale-105'}`}
                                    />
                                    {!isFolded && (
                                        <span
                                            className={`text-sm font-medium relative z-10 transition-all duration-200
                      ${pathname === item.url ? 'font-semibold' : 'group-hover:font-medium'}`}
                                        >
                                            {item.title}
                                        </span>
                                    )}
                                    {pathname === item.url && (
                                        <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                                    )}
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    )
}