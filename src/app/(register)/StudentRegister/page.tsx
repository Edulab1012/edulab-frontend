"use client";
import { useEffect } from "react";
import { useUserStore } from "@/hooks/useUserStore";


export default function StudentRegisterPage() {
    const { role } = useUserStore((state) => ({
        role: state.user?.role,
    }));


    useEffect(() => {
        console.log(role);
    }, [role])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-white">
            <h1 className="text-2xl font-bold mb-4">Student Registration</h1>
            <p className="mb-6">Please fill out the form below to register as a student.</p>

        </div>
    );
}