"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Save,
  X,
  Loader2,
  User,
  Mail,
  Phone,
  GraduationCap,
  Instagram,
  Facebook,
} from "lucide-react";
import { uploadCloudinary } from "@/lib/cloudinary";

import { Student } from "./types";



interface EditProfileProps {
  initialData: Student;
  onSave: (data: Student) => void;
  onCancel: () => void;
}

export default function EditProfile({
  initialData,
  onSave,
  onCancel,
}: EditProfileProps) {
  const [formData, setFormData] = useState<Student>(initialData || {});
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Student) => ({
      ...prev,
      socials: { ...(prev.socials || {}), [name]: value },
    }));
  };

  const handleImageUpload = async (
    file: File,
    type: "avatar" | "background"
  ) => {
    if (!file) return;
    setIsUploading(true);
    try {

      const resourceType = "image";
      const imageUrl = await uploadCloudinary(
        file,
        resourceType

      );

      setFormData((prev: any) => ({
        ...prev,
        ...(type === "avatar"
          ? { avatarUrl: imageUrl }
          : { backgroundUrl: imageUrl }),
      }));
    } catch (error) {
      console.log(`Failed to upload ${type}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName?.trim()) newErrors.firstName = "Нэр оруулна уу";
    if (!formData.lastName?.trim()) newErrors.lastName = "Овог оруулна уу";
    if (!formData.email?.trim()) newErrors.email = "Имэйл оруулна уу";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Зөв имэйл оруулна уу";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Ensure phoneNumber, teacher, and socials are always defined
      const safeFormData = {
        ...formData,
        phoneNumber: formData.phoneNumber ?? "",
        teacher: formData.teacher ?? "",
        socials: formData.socials ?? { instagram: "", facebook: "" },
      };
      onSave(safeFormData);
    }
  };

  const formFields = [
    {
      name: "lastName",
      label: "Овог",
      icon: User,
      type: "text",
      required: true,
    },
    {
      name: "firstName",
      label: "Нэр",
      icon: User,
      type: "text",
      required: true,
    },
    {
      name: "grade", // fixed from "class"
      label: "Анги",
      icon: GraduationCap,
      type: "text",
      required: false,
    },
    { name: "teacher", label: "Багшийн нэр", icon: User, type: "text" },
    { name: "phoneNumber", label: "Утасны дугаар", icon: Phone, type: "tel" },
    {
      name: "email",
      label: "Имэйл",
      icon: Mail,
      type: "email",
      required: true,
    },
  ];

  const socialFields = [
    {
      name: "instagram",
      label: "Instagram",
      icon: Instagram,
      placeholder: "@username",
    },
    {
      name: "facebook",
      label: "Facebook",
      icon: Facebook,
      placeholder: "Нэр",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl ml-15 mt-10"
    >
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
        <div className="relative h-40 rounded-t-lg overflow-hidden">
          {formData.backgroundUrl && (
            <img
              src={formData.backgroundUrl}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <input
            type="file"
            accept="image/*"
            ref={backgroundInputRef}
            onChange={(e) =>
              e.target.files?.[0] &&
              handleImageUpload(e.target.files[0], "background")
            }
            className="hidden"
          />
          <Button
            onClick={() => backgroundInputRef.current?.click()}
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20"
            disabled={isUploading}
          >
            <Camera className="h-4 w-4 mr-2" /> Арын зураг
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 hover:bg-slate-100 dark:hover:bg-slate-700 absolute right-2 top-2"
          >
            <X className="h-4 w-4 mr-2" /> Болих
          </Button>
        </div>

        <CardHeader className="pb-4">
          <div className="flex flex-col items-center -mt-16">
            <div className="relative group w-fit">
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleImageUpload(e.target.files[0], "avatar")
                }
                className="hidden"
              />
              <div
                onClick={() => avatarInputRef.current?.click()}
                className="cursor-pointer"
              >
                <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-700 shadow-xl transition-all hover:opacity-80">
                  <AvatarImage
                    src={formData.avatarUrl || "/placeholder.svg"}
                    alt="Profile"
                  />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {formData.firstName?.charAt(0) || ""}
                    {formData.lastName?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  </div>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mt-4 text-center">
              Профайл засах
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="space-y-2"
              >
                <Label
                  htmlFor={field.name}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                >
                  <field.icon className="h-4 w-4" /> {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={(formData as any)[field.name] || ""}
                  onChange={handleInputChange}
                  placeholder={field.label}
                  className={`transition-colors ${errors[field.name]
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                    }`}
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-500">{errors[field.name]}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="bio" className="text-slate-700 dark:text-slate-300">
              Товч танилцуулга
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Өөрийн тухай товч бичнэ үү..."
              className="min-h-[100px] resize-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Сошиал сүлжээ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label
                    htmlFor={field.name}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <field.icon className="h-4 w-4" /> {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={
                      formData.socials?.[
                      field.name as keyof typeof formData.socials
                      ] || ""
                    }
                    onChange={handleSocialChange}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 pt-6"
          >
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4 mr-2" /> Болих
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUploading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Түр хүлээнэ үү...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Хадгалах
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}