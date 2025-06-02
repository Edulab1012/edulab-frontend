"use client";
import {
  Backpack,
  BookCheck,
  Home,
  LogOut,
  PanelTop,
  Plus,
  ScanEye,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AddClass from "./allclass/AddClass";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";

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

interface Class {
  id: string;
  name: string;
  promoCode?: string;
  createdAt: string;
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

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (teacherId === undefined || !teacherId) {
      router.push("/login");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}class/myclasses/${teacherId}`
        );
        setClasses(response.data);
      } catch (err: any) {
        console.log("❌ Error fetching classes:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);


  const handleClassClick = (classId: string) => {
    router.push(`/teacher/class/${classId}/students`);
  };

  return (
    <Sidebar className="border-r-8 border-r-blue-400 w-84 shadow-md min-h-screen z-20">
      <SidebarContent>
        <SidebarGroup className="px-4 py-6 mt-8">
          <SidebarGroupLabel className="mb-6 flex justify-center"></SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-6">
              {items.map((group) => (
                <div key={group.group}>
                  <div className="text-xs font-light text-gray-400 uppercase px-3 mb-2 tracking-wide">
                    {group.group}
                  </div>

                  {group.links.map((link) => (
                    <div key={link.title}>
                      {link.title === "Шинэ анги үүсгэх" ? (
                        <>
                          <AddClass>
                            <SidebarMenuItem className="mb-6">
                              <SidebarMenuButton
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition cursor-pointer`}
                              >
                                <link.icon className="w-10 h-10" />
                                <span className="text-[22px]">
                                  {link.title}
                                </span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </AddClass>

                          {/* Render classes list below the "Шинэ анги үүсгэх" button */}
                          {loading ? (
                            <div className="pl-4 py-2">Түр хүлээнэ үү...</div>
                          ) : (
                            classes.map((cls) => (
                              <SidebarMenuItem
                                key={cls.id}
                                className="mb-2 ml-6"
                              >
                                <SidebarMenuButton
                                  onClick={() => handleClassClick(cls.id)}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition cursor-pointer ${pathname ===
                                    `/teacher/class/${cls.id}/students`
                                    ? "bg-blue-400 text-white font-semibold"
                                    : ""
                                    }`}
                                >
                                  <PanelTop className="w-6 h-6" />
                                  <span className="text-lg">{cls.name}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))
                          )}
                        </>
                      ) : (
                        <SidebarMenuItem className="mb-6">
                          <Link href={link.url}>
                            <SidebarMenuButton
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition ${pathname === link.url
                                ? "bg-blue-400 text-white font-semibold"
                                : ""
                                }`}
                            >
                              <link.icon className="w-10 h-10" />
                              <span className="text-[22px]">{link.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      )}

                      {link.children?.map((child) => (
                        <SidebarMenuItem key={child.title} className="ml-6">
                          <Link href={child.url}>
                            <SidebarMenuButton
                              className={`flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-50 transition ${pathname === child.url
                                ? "text-primary font-medium"
                                : "text-gray-600"
                                }`}
                            >
                              <child.icon className="w-4 h-4" />
                              <span className="text-sm">{child.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
