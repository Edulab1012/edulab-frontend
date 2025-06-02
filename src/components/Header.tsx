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
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };
  const showSheet = !["/", "/login"].includes(pathname);
  useEffect(() => { });
  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        { title: "Шинэ анги үүсгэх", url: "", icon: Plus },
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
          ${scrolled
              ? "bg-[#f9f9fc]/80 dark:bg-[#101010] backdrop-blur-lg shadow-sm"
              : "bg-[#f9f9fc] dark:bg-[#101010]"
            }
          border-b border-gray-200 dark:border-gray-800
        `}
        >
          <div>
            <Link href="/">
              <Image
                src="/classheroNoback.png"
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
            <div className="flex items-center gap-2 sm:gap-4 bg-[#f9f9fc] dark:bg-[#101010] rounded-lg p-2 shadow-md">
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
                  <MenuIcon></MenuIcon>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="mt-[80px]">
                    <SheetTitle></SheetTitle>
                    {items.map((group) => (
                      <div key={group.group} className="mb-4">
                        <SheetDescription className="text-sm font-semibold mb-2">
                          {group.group}
                        </SheetDescription>
                        {group.links.map((link) => (
                          <Link
                            key={link.title}
                            href={link.url}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#f2f2f2] transition ${pathname === link.url
                              ? "text-primary font-medium"
                              : "text-gray-600"
                              }`}
                          >
                            <link.icon className="w-4 h-4" />
                            <span className="text-sm">{link.title}</span>
                          </Link>
                        ))}
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
          ${scrolled
              ? "bg-[#f9f9fc]/80 dark:bg-[#101010]/80 backdrop-blur-lg shadow-sm"
              : "bg-[#f9f9fc] dark:bg-[#101010]"
            }
          border-b border-gray-200 dark:border-gray-800
        `}
        >
          <Link href="/" className="absolute m-10 ">
            <Image
              src="/classheroNoback.png"
              alt="logo"
              width={200}
              height={200}
              className="w-auto h-30 sm:h-25 dark:invert "
              style={{ width: "auto", height: "90px" }}
              priority
            />
          </Link>
          <div></div>
          <div className="flex items-center gap-2 sm:gap-4 bg-[#f9f9fc] dark:bg-[#101010] rounded-lg p-2 shadow-md">
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