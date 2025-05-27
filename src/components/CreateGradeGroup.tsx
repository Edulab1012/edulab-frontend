'use client'
import { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or use your own toast system
import { BASE_URL } from "@/constants/baseurl";
import { LOCAL_BASE_URL } from "@/constants/baseurl";

export default function CreateGradeGroup() {
    const [grade, setGrade] = useState("");
    const [group, setGroup] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!grade || !group) {
            toast.error("Анги, бүлэг хоосон байж болохгүй!");
            return;
        }

        setLoading(true);
        try {
            console.log(`Анги :${grade} Бүлэг :${group}`);

            await axios.post(`${BASE_URL}class/group`, { grade: parseInt(grade), group }); // adapt route
            toast.success(`Анги :${grade} Бүлэг :${group} : Амжилттай үүсгэгдлээ! 🎉`);
            setGrade("");
            setGroup("");
        } catch (err: any) {
            console.log(err);
            toast.error(err.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mx-auto mt-10 max-w-xl p-6 shadow-xl rounded-2xl">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">🧩 Шинэ анги, бүлэг үүсгэх</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="grade">Анги (тоогоор)</Label>
                        <Input
                            id="grade"
                            placeholder="Жишээ: 7"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="group">Бүлэг</Label>
                        <Input
                            id="group"
                            placeholder="Жишээ: A"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="text-sm"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:w-auto mt-4"
                >
                    {loading ? "Түр хүлээнэ үү..." : "➕ Үүсгэх"}
                </Button>
            </div>
        </Card>
    );
}