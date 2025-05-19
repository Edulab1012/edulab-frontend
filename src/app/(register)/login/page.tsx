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
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5)
      .max(50),
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
        console.log(response.data);
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
        toast("Login failed. Please check your credentials.")
      }
      if (err?.response?.status === 500) {
        toast("Server error. Please try again later.")
      };

    };
  }
  return (
    <div className="w-full bg-yellow-300 flex h-screen">
      <div className="w-1/2">
        <div className="flex items-center gap-3 p-2 absolute">
          <Link href={"/"}>
            <Image alt="logo" src="/logo-back.svg" width={150} height={50} />
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

      <div className="bg-white w-4/4 rounded-l-4xl">
        <Card className="flex justify-center self-center h-full bg-blue-100">
          <div className="flex flex-col self-center justify-center">
            <p className="font-semi text-3xl pb-8 leading-8">Welcome back</p>

            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Please your email"
                          {...field}
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Please your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  type="submit"
                  className="hover:bg-amber-200 bg-amber-300 hover:cursor-pointer rounded-4xl px-15 py-6 text-lg font-semibold border-0"
                >
                  Continue with email
                </Button>
              </form>
            </Form>

            <div className="flex items-center justify-between gap-2 my-5">
              <hr className="w-full border-gray-300" />
              <span className="text-gray-400">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="flex gap-4 flex-col [&_button]:w-full [&_button]:rounded-4xl [&_button]:border-2 [&_button]:py-6 [&_button]:text-lg [&_button]:font-semibold">
              <Button variant="outline">Continue with Google</Button>
              <Button variant="outline">Continue with Facebook</Button>
              <Button variant="outline">Continue with Apple</Button>
              <Button variant="outline">Continue with Twitter</Button>
            </div>

            <div>
              <hr className="text-gray-400 mt-5 mb-5" />
              <p className="text-gray-400">
                © 2025 Powered Edu Management edulab company
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
