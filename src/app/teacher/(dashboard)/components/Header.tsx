"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { any, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, Menu, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { requestFCMToken, onMessageListener } from "@/utils/firebaseUtils";
import { ToastContainer } from 'react-toastify';



const FormSchema = z.object({
  teacher_attendance: z.boolean(),
});

export const Header = () => {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(true);
  const [fcmToken, setFcmToken] = useState("")

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token);
        console.log(token);

      } catch (err) {
        console.error("Error getting FCM token: ", err)
      }
    }
    fetchFCMToken()
  })

  onMessageListener()
    .then((payload: any) => {
      toast(
        <div>
          <strong>{payload.notification.title}</strong>
          <div>{payload.notification.body}</div>
        </div>
      )
      console.log("received foreground message", payload);
    })
    .catch((err: any) => console.error("error: ", err));

  // useEffect(() => {
  //   const token = localStorage.getItem("teacher_token");
  //   setHasToken(!!token);
  // }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher_attendance: false,
    },
  });

  const handleAttendanceChange = (checked: boolean) => {
    form.setValue("teacher_attendance", checked, {
      shouldDirty: true,
      shouldValidate: true,
    });
    toast(
      checked
        ? "Ирц амжилттай бүртгэгдлээ... Ирсэн"
        : "Ирц амжилттай бүртгэгдлээ... Ирээгүй"
    );
    console.log("Ирцийн статус:", checked);
  };

  return (
    <div className="fixed bg-blue-100 w-full h-20 py-5 px-10 z-10">
      <div className="flex items-center justify-end">
        {/* <SidebarTrigger  className="flex justify-self-center"/> */}
        <div className="flex gap-6 items-center">
          {hasToken && pathname === "/teacher" && (
            <Form {...form}>
              <form className="w-[400px] max-w-xl space-y-6 ">
                <FormField
                  control={form.control}
                  name="teacher_attendance"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4 shadow-sm h-[50px] bg-white">
                      <div className="space-y-0.5">
                        <FormLabel>Ирц бүртгүүлэх</FormLabel>
                        <FormDescription>
                          Өнөөдрийн ирцийн мэдээлэл бүртгэх.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={handleAttendanceChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          <ToastContainer></ToastContainer>
          {fcmToken && (
            <div>
              <strong>Token: </strong> {fcmToken}
            </div>
          )}

          <Link href={"/teacher/chat"}>
            <button className="px-5 py-3 cursor-pointer hover:bg-white rounded-3xl bg-transparent border-0">
              <MessageCircle className=" hover:text-black" />
            </button>
          </Link>


          {/* notification section */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-5 py-3 cursor-pointer hover:bg-white rounded-3xl">
              <Bell className="hover:text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex gap-5 items-center">
                <div className="text-2xl font-bold">
                  Шинэ мэдээлэл
                </div>

                <AlertDialog>
                  <AlertDialogTrigger className="p-2 border-1 rounded-[12px] bg-black text-white cursor-pointer">мэдэгдэл илгээх</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl">Мэдэгдэл үүсгэх</AlertDialogTitle>
                      <AlertDialogDescription className="text-xl flex flex-col gap-3">
                        <span>Гарчиг</span>
                        <Input placeholder="Гарчиг"></Input>
                        <span>Мэдээлэл</span>
                        <Input placeholder="Мэдээлэл"></Input>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                      <AlertDialogAction>Илгээх</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </DropdownMenuLabel>
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
                <Link href="/teacher">
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href="/teacher/accountsettings">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={"/teacher/password"}>
                  {" "}
                  <DropdownMenuItem>Password change</DropdownMenuItem>
                </Link>
                <Link href={"/"}>
                  {" "}
                  <DropdownMenuItem className="text-red-500 font-semibold">
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};
