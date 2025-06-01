"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PlusIcon } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import { toast } from "sonner";

const formSchema = z.object({
  lastName: z
    .string()
    .min(2, { message: "Овог хамгийн багадаа 2 үсэгтэй байх ёстой." }),
  firstName: z
    .string()
    .min(2, { message: "Нэр хамгийн багадаа 2 үсэгтэй байх ёстой." }),
  email: z.string().email({ message: "Зөв email хаяг оруулна уу." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой." }),
  emergencyNumber: z
    .string()
    .min(8, { message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой." }),
  gender: z.enum(["male", "female"]),
});

interface AddStudentProps {
  className?: string;
}

export default function AddStudent({ className }: AddStudentProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      emergencyNumber: "",
      gender: undefined,
    },
  });

  const reset = () => {
    setStep(1);
    setOpen(false);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) {
      toast("⚠️ Token not loaded yet. Please wait.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}student`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Student added:", response.data);
      console.log("Submitted values:", values);

      toast(`✅ Сурагч ${values.lastName} нэмэгдлээ`);
      reset();
    } catch (error: any) {
      console.log("❌ Error adding student:", error);
      toast("❌ Алдаа гарлаа. Сурагч нэмэхэд амжилтгүй боллоо.");
    } finally {
      setIsLoading(false); // ✅ Always stop loading
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="text-white bg-[#FF9C42] dark:bg-[#FF9C42] hover:bg-[#ffb36b] hover:text-white"
      >
        <PlusIcon className="mr-2 h-4 w-4 text-white" />
        Сурагч нэмэх
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle className="text-3xl text-[#2C3A4A]   dark:text-[#FFD3A1] font-light">
              Шинэ сурагч нэмэх
            </DialogTitle>
            <DialogDescription className="text-[#2C3A4A]   dark:text-[#FFD3A1]">
              Мэдээллийг бүрэн бөглөнө үү.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && (
                <>
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C3A4A]   dark:text-[#FFD3A1]">
                          Овог
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Овог"
                            {...field}
                            className="h-[55px] bg-white focus-visible:ring-0 w-[340px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C3A4A]   dark:text-[#FFD3A1]">
                          Нэр
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Нэр"
                            {...field}
                            className="h-[55px] bg-white focus-visible:ring-0 w-[340px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C3A4A]   dark:text-[#FFD3A1]">
                          Email хаяг
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email хаяг"
                            {...field}
                            className="h-[55px] bg-white focus-visible:ring-0 w-[340px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C3A4A]   dark:text-[#FFD3A1] ">
                          Утасны дугаар
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Утасны дугаар"
                            {...field}
                            className="h-[55px] bg-white focus-visible:ring-0 w-[340px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C3A4A]   dark:text-[#FFD3A1]">
                          Хүйс
                        </FormLabel>
                        <Select
                          value={field.value || ""}
                          onValueChange={(value) => {
                            console.log(
                              "Selected gender before submit:",
                              value
                            );
                            field.onChange(value);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[55px] w-[340px] bg-white focus-visible:ring-0">
                              <SelectValue placeholder="Хүйсээ сонгоно уу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              value="male"
                              className="text-[#2C3A4A]   dark:text-[#FFD3A1]"
                            >
                              Эрэгтэй
                            </SelectItem>
                            <hr />
                            <SelectItem
                              value="female"
                              className="text-[#2C3A4A]   dark:text-[#FFD3A1]"
                            >
                              Эмэгтэй
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <div className="mb-[100px]">
                  {" "}
                  <FormField
                    name="emergencyNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#2C3A4A]   dark:text-[#FFD3A1]">
                          Яаралтай үед холбоо барих
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Яаралтай үед холбоо барих дугаар"
                            {...field}
                            className="h-[55px] bg-white focus-visible:ring-0 w-[340px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between mt-6">
                {/* <Button
                  type="button"
                  variant="outline"
                  className="h-[55px] w-[200px] mb-[10px] bg-teal-400 hover:bg-teal-500 hover:text-white border-2 border-white rounded-3xl text-white"
                  onClick={reset}
                >
                  Цуцлах
                </Button> */}

                <div className="flex gap-2 justify-center w-full">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="h-[55px] w-[140px] mb-[10px] bg-teal-400 hover:bg-teal-500 hover:text-white border-2 border-white rounded-3xl text-white"
                    >
                      Буцах
                    </Button>
                  )}
                  {step < 2 ? (
                    <Button
                      className="h-[55px] w-[340px] mb-[10px]  bg-[#FF9C42]  hover:bg-[#ffb36b] hover:text-white border-2 border-white rounded-3xl text-white"
                      type="button"
                      onClick={() => setStep(step + 1)}
                    >
                      Дараагийн
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-[55px] w-[140px] mb-[10px] bg-[#FF9C42]  hover:bg-[#ffb36b] hover:text-white border-2 border-white rounded-3xl text-white"
                    >
                      {isLoading ? (
                        <span className="animate-pulse">⏳ Хүлээнэ үү...</span>
                      ) : (
                        "Хадгалах"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
