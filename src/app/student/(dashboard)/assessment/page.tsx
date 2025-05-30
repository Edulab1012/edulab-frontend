"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Calculator,
    Pencil,
    FlaskConical,
    Dumbbell,
    Atom,
    Dna,
    LucideIcon,
} from "lucide-react";

import React from "react";

const lessons = [
    {
        name: "Математик",
        progress: 80,
        exam: 72,
        attendance: 100,
        initiative: 70,
        color: "bg-blue-200",
        icon: "calculator",
    },
    {
        name: "Монгол хэл",
        progress: 85,
        exam: 90,
        attendance: 98,
        initiative: 90,
        color: "bg-amber-200",
        icon: "pencil",
    },
    {
        name: "Хими",
        progress: 60,
        exam: 55,
        attendance: 92,
        initiative: 85,
        color: "bg-pink-200",
        icon: "flask",
    },
    {
        name: "Физик",
        progress: 75,
        exam: 82,
        attendance: 99,
        initiative: 97,
        color: "bg-purple-300",
        icon: "atom",
    },
    {
        name: "Биеийн тамир",
        progress: 100,
        exam: 100,
        attendance: 100,
        initiative: 100,
        color: "bg-orange-200",
        icon: "dumbbell",
    },
    {
        name: "Биологи",
        progress: 62,
        exam: 50,
        attendance: 60,
        initiative: 55,
        color: "bg-green-200",
        icon: "dna",
    },
];

const iconMap: Record<string, LucideIcon> = {
    calculator: Calculator,
    pencil: Pencil,
    flask: FlaskConical,
    dumbbell: Dumbbell,
    atom: Atom,
    dna: Dna,
};

export default function Page() {
    return (
        <div className=" px-10 pt-30 pb-10 bg-gray-200">
            <Card>
                <CardContent>
                    <CardHeader className="text-2xl font-bold leading-8 ">
                        Дүнгийн жагсаалт
                    </CardHeader>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {lessons.map((s, i) => {
                            const average = (s.progress + s.exam + s.attendance) / 3;
                            const Icon = iconMap[s.icon] || Calculator;

                            return (
                                <Card
                                    key={i}
                                    className={` mt-5 h-[250px] rounded-xl shadow-md text-black ${s.color} hover:scale-[1.05] transition-transform duration-300`}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center">
                                            <Icon className="mr-2" />
                                            {s.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-2 text-xl">
                                        <Stat label="Явцын шалгалт" value={s.progress} />
                                        <Stat label="Улирлын шалгалт" value={s.exam} />
                                        <Stat label="Ирц" value={s.attendance} />
                                        <Stat label="Идэвх" value={s.initiative} />
                                        <p className="text-sm w-full bg-white text-black rounded-md flex items-center justify-center font-bold h-7">
                                            Нийт дүн: {average.toFixed(1)}%
                                        </p>
                                        <StatusBadge score={average} />
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <p className="text-xs">
                {label}: {value}%
            </p>
            <div className="w-full bg-white/30 rounded-full h-1 mt-1">
                <div
                    className="bg-white h-1 rounded-full"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function StatusBadge({ score }: { score: number }) {
    const isPass = score >= 60;
    return (
        <span
            className={`absolute top-2 right-2 px-1 py-0.5 rounded-full text-xs font-bold
        ${isPass ? "bg-white text-green-600" : "bg-red-600 text-white"}`}
        >
            {isPass ? "Тэнцсэн" : "Унасан"}
        </span>
    );
}