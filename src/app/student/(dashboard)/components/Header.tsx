'use client'

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
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { onMessageListener } from "@/utils/firebaseUtils";
import { toast } from "sonner";

export const Header = () => {

  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        toast(
          <div>
            <strong className="text-bold text-xl">
              {payload.notification?.title}
            </strong>
            <div>{payload.notification?.body}</div>
          </div>,
          { position: "top-right" }
        );
      })
      .catch((err: any) => console.error("error: ", err));
  }, []);

  return (
    // <div className="fixed bg-blue-100 w-[calc(100%-255px)] h-20 py-5 px-10  ">
    <div className="fixed bg-blue-100 w-full h-20 py-5 px-10 z-20 ">
      <div className=" flex gap-6 items-center justify-self-end">
        <Link href={"/student/chat"}>
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
              <Link href={"/student"}>
                {" "}
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link href={"/student/accountsettings"}>
                {" "}
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href={"/student/password"}>
                {" "}
                <DropdownMenuItem>Password change</DropdownMenuItem>
              </Link>
              <Link href={"/"}> <DropdownMenuItem className="text-red-500 font-semibold">
                Log out
              </DropdownMenuItem></Link>
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
