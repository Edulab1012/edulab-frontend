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
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const educationSchema = z.object({
  degree: z.string().min(2, "Боловсролын зэрэг шаардлагатай"),
  profession: z.string().min(2, "Мэргэжил шаардлагатай"),
  school: z.string().min(2, "Сургуулийн нэр шаардлагатай"),
  gpa: z.string().optional(),
  duration: z
    .string()
    .min(4, "Хугацаа оруулах шаардлагатай")
    .regex(/\d{4}\s*-\s*\d{4}/, "Жишээ: 2019 - 2023"),
});

export const EduInfo = () => {
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      profession: "",
      school: "",
      gpa: "",
      duration: "",
    },
  });

  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof educationSchema
  > | null>(null);

  const onSubmit = (values: z.infer<typeof educationSchema>) => {
    setSubmittedData(values);
  };

  return (
    <Card>
      <CardContent>
        <CardHeader className="text-2xl font-light leading-8 mb-5">
          Боловсролын байдал
        </CardHeader>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 justify-between items-center gap-5">
            <div className="flex flex-col gap-3">
              <p>Мэргэжил</p>
              <Textarea
                value={submittedData?.profession || "Мэргэжил"}
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Боловсролын зэрэг</p>
              <Textarea
                value={submittedData?.degree || "Боловсролын зэрэг"}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Төгссөн сургуулийн нэр</p>
            <Textarea
              value={submittedData?.school || "Төгссөн сургуулийн нэр"}
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <p>Суралцсан хугацаа</p>
              <Textarea
                value={submittedData?.duration || "Суралцсан хугацаа"}
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Голч дүн</p>
              <Textarea value={submittedData?.gpa || "Голч дүн"} disabled />
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
                Хувийн мэдээллээ өөрчлөх үү ?
              </DialogTitle>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-6 justify-center">
                      <div className="flex flex-col">
                        <FormField
                          control={form.control}
                          name="profession"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Мэргэжил</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Мэргэжил"
                                  {...field}
                                  className="border-none w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col">
                        <FormField
                          control={form.control}
                          name="degree"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Боловсролын зэрэг</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Боловсролын зэрэг"
                                  {...field}
                                  className="border-none w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Төгссөн сургуулийн нэр</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Төгссөн сургуулийн нэр"
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
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Суралцсан хугацаа</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Жишээ: 2019 - 2023"
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
                      name="gpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Голч дүн</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Голч дүн"
                              {...field}
                              className="border-none w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
