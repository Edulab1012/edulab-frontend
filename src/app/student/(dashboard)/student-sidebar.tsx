"use client";

import {
  Home, User, LayoutDashboard, ScanEye, BookCheck,
  Menu, X, Moon, Sun, GraduationCap, Notebook,
  Calendar, Settings, LogOut, Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
};

type MenuGroup = {
  group: string;
  links: MenuItem[];
};

const menuItems: MenuGroup[] = [
  {
    group: "My Space",
    links: [
      { title: "Dashboard", url: "/student", icon: Home, isNew: true },
      { title: "My Profile", url: "/student/profile", icon: User },
    ],
  },
  {
    group: "School Life",
    links: [
      { title: "Teachers", url: "/student/teachers", icon: GraduationCap, badge: "3 new" },
      { title: "Attendance", url: "/student/attendance", icon: ScanEye },
      { title: "Classmates", url: "/student/classmates", icon: BookCheck },
      { title: "Timetable", url: "/student/timetable", icon: Calendar },
      { title: "Assignments", url: "/student/assignments", icon: Notebook, badge: "2 due" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  // Set sidebar state based on screen size
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // Play a fun sound effect
    if (typeof window !== "undefined") {
      new Audio('/sounds/pop.mp3').play().catch(() => { });
    }
  };

  return (
    <>
      {/* Mobile trigger button - Cartoon style */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-white shadow-lg shadow-purple-500/30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Overlay with cartoon bubbles */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Glassmorphic Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={cn(
          "fixed md:relative h-screen w-72 z-50 transition-all duration-300",
          "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80",
          "border-r border-white/20 dark:border-gray-700/50",
          "shadow-2xl shadow-purple-500/10 dark:shadow-purple-900/20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo area with cartoon elements */}
          <div className="flex items-center justify-between p-6 pb-4 relative">
            <Link href="/student" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 15 }}>
                <Image
                  src="/classheroNoback.png"
                  alt="logo"
                  width={140}
                  height={50}
                  className="dark:invert transition-all group-hover:scale-105"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -right-2 -top-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </motion.span>
            </Link>
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation with cartoon-inspired buttons */}
          <nav className="flex-1 overflow-y-auto px-4 py-2">
            {menuItems.map((group) => (
              <div key={group.group} className="mb-6">
                <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3 px-3">
                  {group.group}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <motion.li
                      key={link.title}
                      onHoverStart={() => setHoveredItem(link.title)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <Link href={link.url}>
                        <motion.div
                          whileHover={{
                            x: 5,
                            backgroundColor: theme === 'dark' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(196, 181, 253, 0.3)'
                          }}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                            "relative overflow-hidden",
                            pathname === link.url
                              ? "bg-purple-100/60 dark:bg-purple-900/30 font-semibold text-purple-700 dark:text-purple-300"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {/* Animated background effect */}
                          {hoveredItem === link.title && (
                            <motion.div
                              layoutId="hoverBackground"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/5 rounded-xl"
                            />
                          )}

                          <div className="relative">
                            <link.icon className="w-5 h-5 z-10 relative" />
                            {link.isNew && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full"
                              />
                            )}
                          </div>

                          <span className="flex-1">{link.title}</span>

                          {link.badge && (
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300"
                            >
                              {link.badge}
                            </motion.span>
                          )}
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Bottom area with interactive elements */}
          <div className="p-4 border-t border-white/20 dark:border-gray-700/50">
            {/* Theme toggle with cartoon effect */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl",
                "bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/30 dark:to-blue-900/30",
                "text-purple-700 dark:text-purple-300 font-medium",
                "shadow-sm shadow-purple-500/10 dark:shadow-purple-900/10"
              )}
            >
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </div>
              <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </motion.button>

            {/* Student profile quick actions */}
            <div className="mt-4 flex gap-2">
              <motion.button
                whileHover={{ y: -2 }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>

            {/* Fun cartoon decoration */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-4 -right-4 opacity-20 dark:opacity-30"
            >
              <GraduationCap className="w-16 h-16 text-purple-500" />
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}