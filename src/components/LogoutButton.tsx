"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface LogoutButtonProps {
    folded?: boolean;
}

export default function LogoutButton({ folded = false }: LogoutButtonProps) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("teacherId");
        localStorage.removeItem("studentId");
        router.push("/");
    };

    return (
        <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full justify-start px-3 py-3 rounded-xl text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200 ${folded ? "flex items-center justify-center px-2" : "gap-2"
                }`}
        >
            <LogOut className="w-5 h-5" />
            {!folded && <span className="text-sm font-medium">Гарах</span>}
        </Button>
    );
}