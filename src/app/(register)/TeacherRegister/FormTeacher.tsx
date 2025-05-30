"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BASE_URL } from "@/constants/baseurl";
import axios from "axios";
import { useRouter } from "next/navigation";


const steps = [
    { name: "username", label: "Нэр", type: "text" },
    { name: "email", label: "Имэйл хаяг", type: "email" },
    { name: "phoneNumber", label: "Утасны дугаар", type: "number" },
    { name: "password", label: "Нууц үг", type: "password" },
    { name: "confirmPassword", label: "Нууц үг давтах", type: "password" },
];

export default function TeacherRegisterForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [userExist, setUserExist] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const currentField = steps[currentStep];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validateStep = () => {
        const value = (formData as any)[currentField.name];
        if (!value) {
            return "Энэ талбарыг бөглөнө үү.";
        }
        if (currentField.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Имэйл буруу байна.";
        }
        if (currentField.name === "confirmPassword" && formData.password !== value) {
            return "Нууц үг таарахгүй байна.";
        }
        if (currentField.name === "phoneNumber" && value.length !== 8) {
            return "Утасны дугаар зөвхөн 8 оронтой тооноос бүрдэнэ.";
        }
        return "";
    };

    const handleNext = () => {
        const error = validateStep();
        if (error) {
            setErrors((prev) => ({ ...prev, [currentField.name]: error }));
            return;
        }
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleRegister();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        setStatus("idle");
        console.log("📤 Submitted Data:", formData);

        try {
            const res = await axios.post(`${BASE_URL}auth/register`, {
                username: formData.username,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                role: "teacher",
            })
            console.log("✅ Registration Response:", res.data);

            setStatus("success");
            router.push("/teacher")
        } catch (err: any) {
            err?.response?.status === 403 ? setUserExist(true) : setUserExist(false);
            console.log("❌ Registration Error:", err.response?.data || err);

            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-black">
            <Card className="w-full sm:w-[400px] glass-card p-6 rounded-2xl shadow-2xl border border-[#FFE866]/40 space-y-1.5 mt-20 relative">
                <CardTitle className="text-2xl font-extralight text-center">
                    Багш бүртгүүлэх
                </CardTitle>

                <CardContent>
                    <form className="space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentField.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col space-y-1"
                            >
                                <Label htmlFor={currentField.name} className="font-light">
                                    {currentField.label}
                                </Label>
                                <Input
                                    id={currentField.name}
                                    name={currentField.name}
                                    type={currentField.type}
                                    value={(formData as any)[currentField.name]}
                                    onChange={handleChange}
                                    className={`glass-input ${errors[currentField.name] ? "border-red-500" : ""}`}
                                />
                                {errors[currentField.name] && (
                                    <p className="text-red-500 text-sm font-light mt-0.5">
                                        {errors[currentField.name]}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between pt-4 gap-10">
                    {currentStep > 0 && (
                        <Button variant="outline" onClick={handleBack}>
                            Буцах
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        disabled={loading}
                        className="flex-1 ml-auto"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Илгээж байна...
                            </span>
                        ) : currentStep === steps.length - 1 ? (
                            "Бүртгүүлэх"
                        ) : (
                            "Дараах"
                        )}
                    </Button>
                </CardFooter>

                <AnimatePresence>
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-[-25%] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-xl shadow-lg z-50 text-center w-80 border-1 border-white font-light"
                        >
                            Амжилттай бүртгэгдлээ! 🎉
                        </motion.div>
                    )}
                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-[-30%] left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-xl shadow-lg z-50 text-center w-80 border-1 border-white font-light"
                        >
                            {userExist ? "Энэ хэрэглэгч аль хэдийн бүртгэгдсэн байна." : "Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу."}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
}