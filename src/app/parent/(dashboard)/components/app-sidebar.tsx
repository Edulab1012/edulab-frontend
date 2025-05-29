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
      { title: "Home", url: "/parent", icon: Home },
      {
        title: "Профайл тохиргоо",
        url: "/parent/accountsettings",
        icon: User,
      },
    ],
  },
  {
    group: "Сурагч",
    links: [
      { title: "Сурагчийн мэдээлэл", url: "/parent/studentinfo", icon: SquareUser },
      {
        title: "Сурагчийн дүн",
        url: "/parent/studentassessment",
        icon: ChartSpline,
      },
      {
        title: "Багшийн мэдэгдэл",
        url: "/parent/teachercomment",
        icon: ListTodo,
      },
    ],
  },
  {
    group: "Ангийн мэдээлэл",
    links: [
      { title: "Багшийн мэдээлэл", url: "/parent/class", icon: LayoutDashboard },
      {
        title: "Ангийн үйл ажилгаа",
        url: "/parent/classactivity",
        icon: Calendar1,
      },
    ],
  },
  {
    group: "Сургууль",
    links: [
      { title: "Home", url: "/parent/school", icon: Home },
      { title: "Багшын мэдээлэл", url: "/parent/teacherlist", icon: LayoutList },
      { title: "Холбоо барих", url: "/parent/contact", icon: PhoneCall },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="px-6 py-9 flex flex-col gap-4">
          <SidebarGroupLabel className="flex flex-col gap-1 ">
            <h1 className="text-2xl font-light leading-8 text-black ">Эцэг эх</h1>
            <Link href={"/parent"}>
              {" "}
              <Image src="/classheroNoback.png" alt="logo" width={200} height={250} />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu className="pt-10">
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="text-gray-400  ">{item.group}</div>
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
