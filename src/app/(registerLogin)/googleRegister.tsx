'use client'

import { useState } from "react"
import supabase from "@/utils/supabase"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export default function RegisterLoginwithGoogle({ role }: { role?: string }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const [loading, setLoading] = useState(false)

    const handleRegisterLoginwithGoogle = async () => {
        setLoading(true)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${baseUrl}/${role}`,
                },
            })

            if (error) {
                console.log("OAuth error:", error.message)

            }
        } catch (err: any) {
            console.log("Unexpected error:", err.message || err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center p-4">
            <Button
                onClick={handleRegisterLoginwithGoogle}
                disabled={loading}
                className="flex items-center gap-2 bg-white border text-slate-800 hover:bg-slate-100"
            >
                <FcGoogle size={20} />
                {loading ? "Signing in..." : "Register with Google"}
            </Button>
        </div>
    )
}