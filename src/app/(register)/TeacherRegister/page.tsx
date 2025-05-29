"use client";
import { useEffect } from "react";
import TeacherForm from "./FormTeacher";
import { useUserStore } from "@/hooks/useUserStore";

export default function TeacherRegisterPage() {
    const { role } = useUserStore((state) => ({
        role: state.user?.role,
    }));


    useEffect(() => {
        console.log(role);
    }, [role])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-white">
            <TeacherForm></TeacherForm>
        </div>

    )
}