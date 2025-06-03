"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  LogOut,
  Moon,
  Sun,
  MenuIcon,
  Backpack,
  BookCheck,
  PanelTop,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddClass from "@/app/teacher/allclass/AddClass";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  const showSheet = !["/", "/login"].includes(pathname);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll);

    const fetchClasses = async () => {
      const teacherId = localStorage.getItem("teacherId");
      if (!teacherId) return;

      try {
        const response = await axios.get(
          `${BASE_URL}class/teacher/${teacherId}`
        );
        setClasses(response.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (showSheet) {
      fetchClasses();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSheet, pathname]);

  const handleClassClick = (classId: string) => {
    router.push(`/teacher/class/${classId}/students`);
  };

  if (!mounted) return null;

  interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  interface MenuGroup {
    group: string;
    links: MenuItem[];
  }

  const items: MenuGroup[] = [
    {
      group: "Манай ангиуд",
      links: [
        { title: "Бүх ангиуд", url: "/teacher", icon: BookCheck },
        { title: "Шинэ анги үүсгэх", url: "#", icon: Plus },
      ],
    },
    {
      group: "Анги ба хичээл",
      links: [
        { title: "Даасан анги", url: "/teacher/myClass", icon: PanelTop },
        {
          title: "Сурагчдын мэдээлэл",
          url: "/teacher/myStudents",
          icon: Backpack,
        },
      ],
    },
    {
      group: "Тохиргоо",
      links: [{ title: "Гарах", url: "/login", icon: LogOut }],
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "circInOut" }}
      className={`
        fixed top-0 left-0 right-0 z-50 w-full
        flex justify-between items-center px-4 sm:px-6 py-3
        transition-all duration-300 ease-in-out 
        ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
            : "bg-white dark:bg-gray-900"
        }
        border-b border-gray-200 dark:border-gray-700
      `}
    >
      <Link href="/" className="flex items-center">
        <Image
          src={
            theme === "dark" ? "/classheroNoback.png" : "/classheroNoback.png"
          }
          alt="logo"
          width={200}
          height={200}
          className={`h-12 w-auto dark:invert transition-all duration-300 ${
            scrolled ? "scale-90" : "scale-100"
          }`}
          priority
        />
      </Link>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-300" />
          ) : (
            <Moon size={18} className="text-indigo-600" />
          )}
        </Button>

        {showSheet && isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full"
              >
                <MenuIcon size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader className="mt-4">
                <SheetTitle className="flex justify-center">
                  <Image
                    src={
                      theme === "dark"
                        ? "/classheroNoback.png"
                        : "/classheroNoback.png"
                    }
                    alt="logo"
                    width={200}
                    height={200}
                    className="h-12 w-auto dark:invert"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 space-y-6">
                {items.map((group) => (
                  <div key={group.group} className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 uppercase tracking-wider">
                      {group.group}
                    </p>
                    <div className="space-y-1">
                      {group.links.map((link) =>
                        link.title === "Шинэ анги үүсгэх" ? (
                          <div key={link.title} className="space-y-1">
                            <AddClass>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 px-3 ${
                                  pathname === link.url
                                    ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                              >
                                <link.icon className="h-5 w-5" />
                                <span>{link.title}</span>
                              </Button>
                            </AddClass>

                            {loading ? (
                              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                Түр хүлээнэ үү...
                              </div>
                            ) : (
                              <div className="ml-4 space-y-1">
                                {classes.map((cls) => (
                                  <Button
                                    key={cls.id}
                                    variant="ghost"
                                    onClick={() => handleClassClick(cls.id)}
                                    className={`w-full justify-start gap-3 px-3 ${
                                      pathname ===
                                      `/teacher/class/${cls.id}/students`
                                        ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                  >
                                    <PanelTop className="h-5 w-5" />
                                    <span className="truncate">{cls.name}</span>
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link key={link.title} href={link.url}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start gap-3 px-3 ${
                                pathname === link.url
                                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              <link.icon className="h-5 w-5" />
                              <span>{link.title}</span>
                            </Button>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </motion.header>
  );
};
