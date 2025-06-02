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
  Home,
  PanelTop,
  ScanEye,
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
  SheetDescription,
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
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };

  const showSheet = !["/", "/login"].includes(pathname);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll);

    // Fetch classes when component mounts
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
  }, [showSheet]);

  const handleClassClick = (classId: string) => {
    router.push(`/teacher/class/${classId}/students`);
  };

  if (!mounted) return null;

  interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children?: MenuItem[];
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
    <header>
      {isMobile && (
        <motion.header
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "circInOut" }}
          className={`
          fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center
           px-4 sm:px-8 
          transition-all duration-300 ease-in-out 
          ${
            scrolled
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
              : "bg-white dark:bg-gray-900"
          }
          border-b border-gray-200 dark:border-gray-700
        `}
        >
          <div>
            <Link href="/">
              <Image
                src={
                  theme === "dark"
                    ? "/classheroNoback.png"
                    : "/classheroNoback.png"
                }
                alt="logo"
                width={200}
                height={200}
                className="w-auto h-30 sm:h-25 dark:invert "
                style={{ width: "auto", height: "90px" }}
                priority
              />
            </Link>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 sm:gap-4 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-md">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 "
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
            {showSheet && (
              <Sheet>
                <SheetTrigger>
                  <MenuIcon className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="mt-8">
                    <SheetTitle className="text-center">
                      <Image
                        src={
                          theme === "dark"
                            ? "/classheroNoback.png"
                            : "/classheroNoback.png"
                        }
                        alt="logo"
                        width={200}
                        height={200}
                        className="w-auto h-20 mx-auto dark:invert"
                      />
                    </SheetTitle>
                    {items.map((group) => (
                      <div key={group.group} className="mb-6">
                        <SheetDescription className="text-xs font-light text-gray-400 uppercase px-3 mb-2 tracking-wide">
                          {group.group}
                        </SheetDescription>
                        {group.links.map((link) =>
                          link.title === "Шинэ анги үүсгэх" ? (
                            <div key={link.title}>
                              <AddClass>
                                <div
                                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-3 hover:bg-blue-400 hover:text-white transition cursor-pointer`}
                                >
                                  <link.icon className="w-6 h-6" />
                                  <span className="text-lg">{link.title}</span>
                                </div>
                              </AddClass>

                              {/* Render classes list below the "Шинэ анги үүсгэх" button */}
                              {loading ? (
                                <div className="pl-4 py-2 text-sm">
                                  Түр хүлээнэ үү...
                                </div>
                              ) : (
                                classes.map((cls) => (
                                  <div
                                    key={cls.id}
                                    onClick={() => handleClassClick(cls.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ml-6 hover:bg-blue-400 hover:text-white transition cursor-pointer ${
                                      pathname ===
                                      `/teacher/class/${cls.id}/students`
                                        ? "bg-blue-400 text-white font-semibold"
                                        : ""
                                    }`}
                                  >
                                    <PanelTop className="w-5 h-5" />
                                    <span className="text-md">{cls.name}</span>
                                  </div>
                                ))
                              )}
                            </div>
                          ) : (
                            <Link
                              key={link.title}
                              href={link.url}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-3 hover:bg-blue-400 hover:text-white transition ${
                                pathname === link.url
                                  ? "bg-blue-400 text-white font-semibold"
                                  : ""
                              }`}
                            >
                              <link.icon className="w-6 h-6" />
                              <span className="text-lg">{link.title}</span>
                            </Link>
                          )
                        )}
                      </div>
                    ))}
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </motion.header>
      )}
      {!isMobile && (
        <motion.header
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "circInOut" }}
          className={`
          fixed top-0 left-0 right-0 z-50 w-full
          flex justify-between items-center px-4 sm:px-8 py-3
          transition-all duration-300 ease-in-out 
          ${
            scrolled
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
              : "bg-white dark:bg-gray-900"
          }
          border-b border-gray-200 dark:border-gray-700
        `}
        >
          <Link href="/" className="absolute m-10 ">
            <Image
              src={
                theme === "dark"
                  ? "/classheroNoback.png"
                  : "/classheroNoback.png"
              }
              alt="logo"
              width={200}
              height={200}
              className="w-auto h-30 sm:h-25 dark:invert "
              style={{ width: "auto", height: "90px" }}
              priority
            />
          </Link>
          <div></div>
          <div className="flex items-center gap-2 sm:gap-4 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-md">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 "
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </motion.header>
      )}
    </header>
  );
};
