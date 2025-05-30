"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function StudentForm() {
    const [next, setNext] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("idle");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const checkPromoCode = async () => {
        setLoading(true);
        setError("");
        setStatus("idle");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const valid = ["CLASS2023", "LEARN2024", "STUDENT123"].includes(
                promoCode.toUpperCase()
            );
            if (!valid) throw new Error("Код буруу байна");
            setStatus("success");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setNext(true);
        } catch (err) {
            setStatus("error");
            setError(err.message);
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative flex items-center justify-center sm:w-550 min-h-screen dark:bg-black bg-white px-4">
            <Card className="w-full max-w-md glass-card p-4 sm:p-6 rounded-2xl shadow-2xl border border-[#FFE866]/40">
                <CardContent>
                    <form>
                        <AnimatePresence mode="wait">
                            {!next ? (
                                <motion.div
                                    key="promo"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-2"
                                >
                                    <Label>Class Promo Code</Label>
                                    <div className="relative">
                                        <Input
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="glass-input pr-10"
                                            disabled={loading}
                                        />
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
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Нэр</Label>
                                        <Input
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="glass-input"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Имэйл</Label>
                                        <Input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="glass-input"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Нууц үг</Label>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="glass-input"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Дахин оруулна уу</Label>
                                        <Input
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="glass-input"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between pt-4">
                    <Button
                        onClick={() => {
                            setNext(false);
                            setStatus("idle");
                            setError("");
                        }}
                        disabled={loading || !next}
                        variant="outline"
                    >
                        Буцах
                    </Button>

                    {!next && (
                        <Button
                            onClick={checkPromoCode}
                            disabled={loading || !promoCode.trim()}
                            className="min-w-32"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Шалгаж байна...
                                </span>
                            ) : (
                                "Үргэлжлүүлэх"
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}