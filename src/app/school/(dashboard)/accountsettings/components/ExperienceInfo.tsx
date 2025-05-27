"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

export const experienceSchema = z.object({
  position: z.string().min(2, "Албан тушаал шаардлагатай"),
  company: z.string().min(2, "Байгууллагын нэр шаардлагатай"),
  duration: z
    .string()
    .min(4, "Хугацаа шаардлагатай")
    .regex(/^(\d{4})\s*-\s*(\d{4})$/, "Жишээ: 2020 - 2023"),
  description: z.string().min(5, "Тайлбар оруулна уу"),
  language: z
    .array(
      z.object({
        languageName: z.string().min(2, "Хэлний нэр шаардлагатай"),
        languageProficiency: z.string().min(2, "Мэдлэгийн түвшин шаардлагатай"),
      })
    )
    .min(1, "Хэлний мэдлэг оруулах шаардлагатай"),
  softSkills: z
    .array(
      z.object({
        skillName: z.string().min(2, "Ур чадварын нэр шаардлагатай"),
        proficiency: z.enum(["Эхний түвшин", "Дунд түвшин", "Өндөр түвшин"]),
      })
    )
    .min(1, "Мягк ур чадвар оруулах шаардлагатай"),
});

export const ExperienceInfo = () => {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof experienceSchema
  > | null>(null);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      position: "",
      company: "",
      duration: "",
      description: "",
      language: [{ languageName: "", languageProficiency: "" }],
      softSkills: [{ skillName: "", proficiency: "Эхний түвшин" }],
    },
  });

  const {
    fields: languageFields,
    append: addLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "language",
  });

  const {
    fields: softSkillFields,
    append: addSoftSkill,
    remove: removeSoftSkill,
  } = useFieldArray({
    control: form.control,
    name: "softSkills",
  });

  const onSubmit = (values: z.infer<typeof experienceSchema>) => {
    setSubmittedData(values);
    console.log("Submitted data:", values);
  };

  return (
    <Card>
      <CardContent>
        <CardHeader className="text-2xl font-light leading-8 mb-5">
          Туршлага
        </CardHeader>
        <div className="grid ">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 justify-between gap-5">
              <div className="flex flex-col gap-3">
                <p>Албан тушаал</p>
                <Textarea
                  value={submittedData?.position || "Албан тушаал"}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-3">
                <p>Байгууллагын нэр</p>
                <Textarea
                  value={submittedData?.company || "Байгууллагын нэр"}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p>Ажилласан хугацаа</p>
              <Textarea
                value={submittedData?.duration || "Ажилласан хугацаа"}
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <p>Хэлний мэдлэг</p>
                <Textarea
                  value={
                    submittedData?.language
                      ?.map(
                        (l) => `${l.languageName} (${l.languageProficiency})`
                      )
                      .join(", ") || "Хэлний мэдлэг"
                  }
                  disabled
                />
              </div>
              <div className="flex flex-col gap-3">
                <p>Бусад ур чадвар</p>
                <Textarea
                  value={
                    submittedData?.softSkills
                      ?.map((s) => `${s.skillName} (${s.proficiency})`)
                      .join(", ") || "Бусад ур чадвар"
                  }
                  disabled
                />
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
                Хувийн мэдээллээ өөрчлөх үү?
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Албан тушаал</FormLabel>
                        <FormControl>
                          <Input placeholder="Албан тушаал" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Байгууллагын нэр</FormLabel>
                        <FormControl>
                          <Input placeholder="Байгууллагын нэр" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ажилласан хугацаа</FormLabel>
                      <FormControl>
                        <Input placeholder="2020 - 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тайлбар</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Дэлгэрэнгүй тайлбар"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <FormLabel>Хэлний мэдлэг</FormLabel>
                  {languageFields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name={`language.${index}.languageName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Хэл" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`language.${index}.languageProficiency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Түвшин" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      addLanguage({ languageName: "", languageProficiency: "" })
                    }
                  >
                    Хэл нэмэх
                  </Button>
                </div>

                <div className="flex flex-col gap-3">
                  <FormLabel>Бусад ур чадвар</FormLabel>
                  {softSkillFields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name={`softSkills.${index}.skillName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Ур чадвар" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`softSkills.${index}.proficiency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Түвшин (Эхний түвшин)"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      addSoftSkill({
                        skillName: "",
                        proficiency: "Эхний түвшин",
                      })
                    }
                  >
                    Ур чадвар нэмэх
                  </Button>
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
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
