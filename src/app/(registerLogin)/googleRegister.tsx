'use client'

import { useState } from "react"
import supabase from "@/utils/supabase"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export default function RegisterWithGoogle({ role }: { role: string }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const [loading, setLoading] = useState(false)

    const handleRegisterWithGoogle = async () => {
        setLoading(true)

        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${baseUrl}/${role}`,
            },
        })

        setLoading(false)
    }

    return (
        <div className="flex justify-center p-4">
            <Button
                onClick={handleRegisterWithGoogle}
                disabled={loading}
                className="flex items-center gap-2 bg-white border text-slate-800 hover:bg-slate-100"
            >
                <FcGoogle size={20} />
                {loading ? "Signing in..." : "Register with Google"}
            </Button>
        </div>
    )
}