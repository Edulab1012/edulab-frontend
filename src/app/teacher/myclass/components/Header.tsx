import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Bell, Icon, icons, List, Menu, MessageCircle } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Badge } from "@/components/ui/badge";
  import Link from "next/link";
  
  export const Header = () => {
    return (
      <div className="fixed bg-blue-100 w-full h-20 py-5 px-10 ">
        <div className=" flex gap-6 items-center justify-self-end">
        <Link href={"/chat"}>
            <button className="px-5 py-3 cursor-pointer hover:bg-white rounded-3xl bg-transparent border-0">
              <MessageCircle className=" hover:text-black" />
            </button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-5 py-3  cursor-pointer hover:bg-white rounded-3xl">
              <Bell className=" hover:text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Шинэ мэдээлэл</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-3">
                <DropdownMenuItem className="flex flex-col bg-red-50 justify-start">
                  <h6 className="text-lg">Mat</h6>
                  <p>Irtsiin burtgel hiigeerei</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col bg-red-50 justify-start">
                  <h6 className="text-lg">Mongol hel</h6>
                  <p>Irtsiin burtgel hiigeerei</p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-3 bg-white rounded-full w-fit px-3 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/"}>
                  {" "}
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href={"/accountsettings"}>
                  {" "}
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-red-500 font-semibold">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    );
  };
  