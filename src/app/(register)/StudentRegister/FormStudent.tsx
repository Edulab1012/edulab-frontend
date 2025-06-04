"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/baseurl";

export default function StudentForm() {
    const router = useRouter();
    const [next, setNext] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");
    const [className, setClassName] = useState("");
    const [error, setError] = useState("");
    const [fieldError, setFieldError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
    const [classId, setClassId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkPromoCode = async () => {
        setLoading(true);
        setError("");
        setStatus("idle");

        try {
            const res = await axios.post(`${BASE_URL}class/joinClass`, { promoCode });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setClassName(res.data.class.name);
            setClassId(res.data.class.id);

            if (res.data.success) {
                setStatus("success");
                setTimeout(() => setNext(true), 1000);
            } else {
                throw new Error("Код буруу байна");
            }
        } catch (err: any) {
            setStatus("error");
            setError(err.response?.data?.message || "Код буруу байна");
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldError("");
        setStatus("idle");

        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            setFieldError("Бүх талбарыг бүрэн бөглөнө үү.");
            return;
        }

        if (password !== confirmPassword) {
            setFieldError("Нууц үг тохирохгүй байна.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: "student",
                classId: classId,
            });

            if (res.data.success) {
                setFormStatus("success");
                localStorage.setItem("studentId", res.data.student.id);
                setTimeout(() => {
                    router.push("/student");
                }, 3000);

            } else {
                setStatus("error");
                setFieldError(res.data.message || "Бүртгэл амжилтгүй боллоо");
            }
        } catch (err: any) {
            console.log(err);

            setStatus("error");
            setFieldError(err.response?.data?.message || "Бүртгэл амжилтгүй боллоо");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center sm:w-550 h-auto px-4 ">
            <Card className="w-full max-w-md glass-card rounded-xl shadow-2xl shadow-amber-600 border bg-[#f1f1f1] border-amber-600 h-auto dark:bg-amber-900/5 p-10">
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {!next ? (
                                <motion.div
                                    key="promo"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-2"
                                >
                                    <Label className="text-xl font-light">Ангийн код</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    checkPromoCode();
                                                }
                                            }}
                                            className="glass-input pr-10"
                                            disabled={loading}
                                        />
                                        <p className="text-sm text-muted-foreground m-2">
                                            👉 Энэ кодыг таны багш анги үүсгэх үед гаргаж авсан байдаг. Багш нь тухайн кодыг сурагчидтай хуваалцсанаар та зөв ангид бүртгэгдэх боломжтой болно.
                                        </p>
                                        <AnimatePresence>
                                            {status === "success" && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute right-3 top-2.5 text-green-500"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </motion.span>
                                            )}
                                            {status === "error" && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute right-3 top-2.5 text-red-500"
                                                >
                                                    <XCircle className="h-5 w-5" />
                                                </motion.span>
                                            )}

                                        </AnimatePresence>

                                    </div>
                                    {error && <p className="text-sm text-red-500 mx-2">{error}</p>}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <motion.h1
                                        className="text-2xl font-light tracking-tight drop-shadow-sm"
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        Ангийн нэр :
                                        <span className="ml-2 font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                                            {className}
                                        </span>
                                    </motion.h1>

                                    <InputBlock label="Нэр" name="username" value={formData.username} onChange={handleChange} />
                                    <InputBlock label="Имэйл" name="email" value={formData.email} onChange={handleChange} />

                                    <PasswordInput
                                        label="Нууц үг"
                                        name="password"
                                        value={formData.password}
                                        onKeyDown={(e: { key: string; preventDefault: () => void; }) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                            }
                                        }}
                                        onChange={handleChange}
                                        show={showPassword}
                                        toggle={() => setShowPassword(!showPassword)}
                                    />

                                    <PasswordInput
                                        label="Баталгаажуулах нууц үг"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onKeyDown={(e: { key: string; preventDefault: () => void; }) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                            }
                                        }}
                                        show={showConfirmPassword}
                                        toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                        error={formData.password !== formData.confirmPassword && formData.confirmPassword}
                                    />

                                    {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                    <AnimatePresence mode="wait">
                        {formStatus === "success" ? (
                            // ✅ Том амжилтын animation
                            <motion.div
                                key="success-form"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-center text-green-600 space-y-4 py-10"
                            >
                                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                <h2 className="text-xl font-light">🎉 Бүртгэл амжилттай!</h2>
                                <p className="text-sm text-muted-foreground">
                                    Түр хүлээнэ үү... танд зориулсан хуудас руу шилжүүлж байна.
                                </p>
                            </motion.div>
                        ) : !next ? (
                            // 🧪 Ангийн код шалгах форм
                            <motion.div key="promo"></motion.div>
                        ) : (
                            // 👤 Бүртгэлийн форм
                            <motion.div key="register">...</motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="flex justify-between pt-4">

                    <Button
                        onClick={() => {
                            setNext(false);
                            setStatus("idle");
                            setError("");
                            setFieldError("");
                        }}
                        disabled={loading || !next}
                        variant="outline"
                    >
                        Буцах
                    </Button>

                    {!next ? (
                        <Button onClick={checkPromoCode} disabled={loading || !promoCode.trim()} className="min-w-32">
                            {loading ? (
                                <span className="flex items-center">
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Шалгаж байна...
                                </span>
                            ) : (
                                "Үргэлжлүүлэх"
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            className="min-w-32"
                            disabled={loading} // 👉 Товч дарагдсан үед дахин дарагдахаас сэргийлнэ
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Илгээж байна...
                                </span>
                            ) : (
                                "Бүртгүүлэх"
                            )}
                        </Button>

                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

const InputBlock = ({ label, name, value, onChange }: any) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <Input name={name} value={value} onChange={onChange} className="glass-input" />
    </div>
);

const PasswordInput = ({ label, name, value, onChange, show, toggle, error }: any) => (
    <div className="space-y-2 relative">
        <Label>{label}</Label>
        <Input
            name={name}
            type={show ? "text" : "password"}
            value={value}
            onChange={onChange}
            className={`glass-input pr-10 ${error ? "border-red-500" : ""}`}
        />
        <span
            className="absolute right-3 top-9 cursor-pointer text-muted-foreground"
            onClick={toggle}
        >
            {show ? "🙈" : "👁️"}
        </span>
    </div>
);