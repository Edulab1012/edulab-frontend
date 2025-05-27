"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export const PersonalInfo = () => {
  const formSchema = z.object({
    lastName: z.string().min(3, "Хэт богино байна").max(30),
    firstName: z.string().min(3, "Хэт богино байна").max(30),
    email: z.string().email("Зөв и-мэйл бичнэ үү"),
    phone1: z.string().min(8, "Утасны дугаар буруу байна"),
    phone2: z.string().min(8, "Утасны дугаар буруу байна"),
    emergencyPhone: z.string().min(8, "Утасны дугаар буруу байна"),
    relation: z.string(),
    school: z.string(),
    profession: z.string(),
    experience: z.string(),
    degree: z.string(),
    profileImage: z.instanceof(File).optional(),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phone1: "",
      phone2: "",
      emergencyPhone: "",
      relation: "",
      school: "",
      profession: "",
      experience: "",
      degree: "",
      profileImage: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted data:", values);
  };

  // Зураг оруулж байгаа хэсэг энд
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card>
      <CardContent className="">
        <CardHeader className="text-2xl font-light leading-8 mb-5">
          Хувийн мэдээлэл
        </CardHeader>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-3 justify-center items-center">
            <p className="pl-[30px] pb-[20px]">Профайл зураг</p>
            <Image
              src={"/classheroNoback.png"}
              alt="profile"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 justify-between gap-5">
              <div className="flex flex-col gap-3">
                <p>Овог</p>
                <Textarea value="Овог" disabled />
              </div>
              <div className="flex flex-col gap-3">
                <p>Нэр</p>
                <Textarea value="Нэр" disabled />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <p>Албан имэйл хаяг</p>
                <Textarea value="Хувийн имэйл хаяг" disabled />
              </div>
              <div className="flex flex-col gap-3">
                <p>Хувийн имэйл хаяг</p>
                <Textarea value="Хувийн имэйл хаяг" disabled />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <p>Утасны дугаар 1</p>
                <Textarea value="Утасны дугаар 1" disabled />
              </div>
              <div className="flex flex-col gap-3">
                <p>Утасны дугаар 2</p>
                <Textarea value="Утасны дугаар 2" disabled />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <p> Яаралтай үед холбоо барих дугаар</p>
                <Textarea value="Яаралтай үед холбоо барих дугаар" disabled />
              </div>
              <div className="flex flex-col gap-3">
                <p>Таны хэн болох</p>
                <Textarea value="Таны хэн болох" disabled />
              </div>
            </div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger className="px-8 py-3 bg-black text-white rounded-2xl flex justify-self-end my-5 cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black">
            Шинэчлэх
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="">
                {" "}
                Хувийн мэдээллээ өөрчлөх үү ?
              </DialogTitle>
            </DialogHeader>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className=" flex justify-self-center">
                    <FormField
                      control={form.control}
                      name="profileImage"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel className="text-black mx-auto">
                            Профайл зураг
                          </FormLabel> */}
                          <FormControl>
                            <div className="relative my-5">
                              <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  handleImageChange(e);
                                  field.onChange(e.target.files?.[0] || null);
                                }}
                                className="hidden"
                              />
                              <label
                                htmlFor="profileImage"
                                className="cursor-pointer"
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-yellow-500 text-white rounded-full z-10 opacity-0 ">
                                  <p>Зураг солих</p>
                                </div>

                                {imagePreview ? (
                                  <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className=" rounded-full object-cover"
                                  />
                                ) : (
                                  <div className=" rounded-full bg-gray-300 flex items-center justify-center w-[150px] h-[150px]">
                                    <p>Зураг оруулах</p>
                                  </div>
                                )}
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    {" "}
                    {/* Нэр */}
                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Овог</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Овог"
                                {...field}
                                className="border-none w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Нэр</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Нэр"
                                {...field}
                                className="border-none w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Мэйл */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Хувийн майл хаяг</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="personal@gmail.com"
                              {...field}
                              className="border-none w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-5">
                      {/* Утасны дугаар */}
                      <FormField
                        control={form.control}
                        name="phone1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Утасны дугаар</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Утасны дугаараа оруулна уу"
                                {...field}
                                className="border-none w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Утасны дугаар 2</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Утасны дугаараа оруулна уу"
                                {...field}
                                className="border-none w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="emergencyPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Яааралтай үеийн холбогдох дугаар
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Утасны дугаараа оруулна уу"
                              {...field}
                              className="border-none w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Таны хэн болох</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Хамаарал холбоо"
                              {...field}
                              className="border-none w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-5 mt-6 justify-end">
                    <DialogClose className="px-3 rounded-md text-sm bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-black cursor-pointer">
                      Цуцлах
                    </DialogClose>{" "}
                    <Button
                      type="submit"
                      className="cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"
                    >
                      Хадгалах
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
