"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email("И-майл хаягаа оруулна уу.").min(5).max(50),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, values);
      if (response.status === 200) {
        toast("✅ Login successful! 🎉");
        localStorage.setItem("token", response.data.token);
        console.log(response.data, "LOGIN HESEGIIN TOKEN!!!");
      }

      if (response.data.message === "admin") {
        router.push("/school");
      }
      if (response.data.message === "teacher") {
        router.push("/teacher");
      }
      if (response.data.message === "student") {
        router.push("/student");
      }
      if (response.data.message === "parent") {
        router.push("/parent");
      }
    } catch (err: any) {
      console.log("Login error:", err?.response?.data);

      if (err?.response?.status === 401) {
        toast("Login failed. Please check your credentials.");
      }
      if (err?.response?.status === 500) {
        toast("Server error. Please try again later.");
      }
    }
  };
  return (
    <div className="w-full bg-teal-400 flex h-screen">
      <div className="w-1/2">
        <div className="flex items-center gap-3 p-2 absolute">
          <Link href={"/"}>
            <Image alt="logo" src="/classheroNoback.png
            " width={150} height={50} />
          </Link>
        </div>
        <div className="flex justify-center items-center h-full px-5">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full max-w-md"
          >
            <CarouselContent className="p-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="flex aspect-square items-center justify-center p-0">
                    <Image
                      alt="carousel"
                      src="/logo-back.svg"
                      width={300}
                      height={300}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="w-4/4 rounded-l-4xl">
        <Card className="flex justify-center self-center h-full bg-blue-400">
          <div className="flex flex-col self-center justify-center">
            <p className="font-semi text-white text-3xl pb-8 leading-8">
              Тавтай морилно уу...
            </p>

            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="text-[14px] text-white">
                        И-майл
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="email"
                          placeholder="И-майл ээ оруулна уу."
                          {...field}
                          className="h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400  focus-visible:border-teal-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] text-white">
                        Нууц үг
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Нууц үгээ оруулна уу."
                          {...field}
                          className="h-[55px] w-[400px] focus-visible:ring-0 rounded-2xl bg-white border-4 border-blue-400  focus-visible:border-teal-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  type="submit"
                  className="text-white bg-teal-400 hover:bg-teal-500 hover:text-white hover:cursor-pointer rounded-4xl px-15 py-6 text-lg font-semibold border-2 w-[400px]"
                >
                  Нэвтрэх
                </Button>
              </form>
            </Form>

            <div className="flex items-center justify-between gap-2 my-5">
              <hr className="w-full border-gray-300" />
              <span className="text-gray-400">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="flex gap-4 flex-col [&_button]:w-full [&_button]:rounded-4xl [&_button]:border-2 [&_button]:py-6 [&_button]:text-lg [&_button]:font-semibold">
              <Button
                variant="outline"
                className="text-white bg-teal-400 hover:bg-teal-500 hover:text-white hover:cursor-pointer rounded-4xl px-15 py-6 text-lg font-semibold border-0 w-[400px]"
              >
                Google - ээр нэвтрэх
              </Button>
              <Button
                variant="outline"
                className="text-white bg-teal-400 hover:bg-teal-500 hover:text-white hover:cursor-pointer rounded-4xl px-15 py-6 text-lg font-semibold border-0 w-[400px]"
              >
                Facebook - ээр нэвтрэх
              </Button>
            </div>

            <div>
              <hr className="text-gray-400 mt-5 mb-5" />
              <p className="text-white">
                © 2025 Powered Edu Management edulab company
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
