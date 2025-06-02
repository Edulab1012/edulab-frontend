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
import { usePathname } from "next/navigation";
import AddClass from "./allclass/AddClass";
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

export function AppSidebar() {
  const pathname = usePathname();

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
                        // Render the AddClass component for this specific button
                        <AddClass>
                          <SidebarMenuItem className="mb-6">
                            <SidebarMenuButton
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition cursor-pointer`}
                            >
                              <link.icon className="w-10 h-10" />
                              <span className="text-[22px]">{link.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </AddClass>
                      ) : (
                        // Normal menu item for other links
                        <SidebarMenuItem className="mb-6">
                          <Link href={link.url}>
                            <SidebarMenuButton
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition ${
                                pathname === link.url
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

                      {/* Keep the children rendering logic */}
                      {link.children?.map((child) => (
                        <SidebarMenuItem key={child.title} className="ml-6">
                          <Link href={child.url}>
                            <SidebarMenuButton
                              className={`flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-50 transition ${
                                pathname === child.url
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
