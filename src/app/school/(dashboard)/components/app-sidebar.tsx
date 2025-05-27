import {
  Calendar1,
  ChartSpline,
  Home,
  LayoutDashboard,
  LayoutList,
  ListTodo,
  NotebookTabs,
  PanelTop,
  PhoneCall,
  ScanEye,
  Square,
  SquareChartGantt,
  SquareUser,
  TrendingUp,
  User,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Layout from "../layout";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  group: string;
  links: MenuItemLink[];
}

interface MenuItemLink {
  title: string;
  url: string;
  icon: React.ComponentType;
}

const items = [
  {
    group: "Профайл",
    links: [
      { title: "Home", url: "/school", icon: Home },
      {
        title: "Профайл тохиргоо",
        url: "school/accountsettings",
        icon: User,
      },
    ],
  },
  {
    group: "Сургууль",
    links: [
      {
        title: "Багшын мэдээлэл",
        url: "/school/teacherlist",
        icon: LayoutList,
      },
    ],
  },
  {
    group: "Сурагч",
    links: [
      {
        title: "Сурагчдийн мэдээлэл",
        url: "/school/studentsinfo",
        icon: SquareUser,
      },
    ],
  },
  {
    group: "Анги",
    links: [
      { title: "Ангийн жагсаалт", url: "/school/class", icon: LayoutDashboard },
      {
        title: "Ангийн үйл ажилгаа",
        url: "/school/classactivity",
        icon: Calendar1,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="z-30">
      <SidebarContent>
        <SidebarGroup className="px-6 py-9 flex flex-col gap-4">
          <SidebarGroupLabel className="flex flex-col">
            <h1 className="text-2xl font-light leading-8 text-black ">
              Сургууль нэр
            </h1>
            <Link href={"/school"}>
              <Image src="/classheroNoback.png" alt="logo" width={200} height={250} />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu className="pt-10">
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="text-gray-400 ">{item.group}</div>
                  {item.links.map((link: MenuItemLink) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton className="h-15">
                        <div className="flex items-center gap-4 pt-4 pb-3 pl-3">
                          <a
                            href={link.url}
                            className="flex items-center gap-3"
                          >
                            <link.icon />
                            <span className="leading-4">{link.title}</span>
                          </a>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
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
