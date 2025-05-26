"use client";
import React, { useState } from "react";
import { BellRing, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTeacherFormStore } from "@/app/school/(dashboard)/teacherlist/TeacherData/useTeacherFormStore";

export default function SectionHeader() {
  const [open, setOpen] = useState(false);

  const { firstName, lastName, email, phoneNumber, password, setField } =
    useTeacherFormStore();

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
  });

  const handleSubmit = async () => {
    const newErrors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/teacher/update`, // You can modify the endpoint if needed
        payload
      );
      toast.success("Профайл амжилттай шинэчлэгдлээ");
      setOpen(false);
    } catch (error) {
      console.error("Error updating teacher:", error);
      toast.error("Профайл шинэчлэхэд алдаа гарлаа");
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 h-[60px] bg-blue-400 border-b-2 border-b-white z-10">
        <nav className="flex w-full justify-end items-center h-full pr-[140px]">
          <ul className="flex gap-4">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-teal-400 border-2 h-[40px]"
                  >
                    <BellRing />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Мэдэгдэл</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Мэдэгдэл байхгүй
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-teal-400 border-2 h-[40px]"
                  >
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 flex flex-col items-center">
                  <DropdownMenuLabel>
                    Сурагчийн нэр нэр , овгийн эхний үсэг орж ирнэ
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                      Profile Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className=" font-semibold mb-4 text-white text-2xl">
            Профайл мэдээлэл шинэчлэх
          </DialogTitle>
          <hr />
          <div className="grid gap-3 items-center justify-center">
            <div className="grid gap-1.5">
              <Label
                className={errors.lastName ? "text-red-500" : "text-[18px]"}
              >
                Овог
              </Label>
              <Input
                placeholder="Овог"
                value={lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                className={
                  errors.lastName
                    ? "border-red-500"
                    : "h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400"
                }
              />
            </div>

            <div className="grid gap-1.5">
              <Label
                className={errors.firstName ? "text-red-500" : "text-[18px]"}
              >
                Нэр
              </Label>
              <Input
                placeholder="Нэр"
                value={firstName}
                onChange={(e) => setField("firstname", e.target.value)}
                className={
                  errors.firstName
                    ? "border-red-500"
                    : "h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400"
                }
              />
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.email ? "text-red-500" : "text-[18px]"}>
                Имэйл
              </Label>
              <Input
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setField("email", e.target.value)}
                className={
                  errors.email
                    ? "border-red-500"
                    : "h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400"
                }
              />
            </div>

            <div className="grid gap-1.5">
              <Label
                className={errors.phoneNumber ? "text-red-500" : "text-[18px]"}
              >
                Утасны дугаар
              </Label>
              <Input
                placeholder="99112233"
                value={phoneNumber}
                onChange={(e) => setField("phoneNumber", e.target.value)}
                className={
                  errors.phoneNumber
                    ? "border-red-500"
                    : "h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400"
                }
              />
            </div>

            <div className="grid gap-1.5">
              <Label
                className={errors.password ? "text-red-500" : "text-[18px]"}
              >
                Нууц үг
              </Label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setField("password", e.target.value)}
                className={
                  errors.password
                    ? "border-red-500"
                    : "h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400"
                }
              />
            </div>

            <Button
              className="mt-4  h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl "
              onClick={handleSubmit}
            >
              Шинэчлэх
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
