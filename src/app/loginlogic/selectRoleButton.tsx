'use client'
import { useState } from "react"
import supabase from "../../utils/supabase"

export default function SelectRoleButton() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const [selectedRole, setSelectedRole] = useState("")

    const handleLoginWithRole = async (role: string) => {

        setSelectedRole(role)

        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${baseUrl}/${role}?role=${role}`,
            },
        })
    }


    return (
        <>
            <div className="flex gap-20 bg-amber-200 m-30 items-center p-2">
                <button onClick={() => handleLoginWithRole("teacher")} className="p-2 hover:bg-blue-300 bg-blue-100 rounded-md">Teacher</button>
                <button onClick={() => handleLoginWithRole("student")} className="p-2 hover:bg-blue-300 bg-blue-100 rounded-md">Student</button>
                <button onClick={() => handleLoginWithRole("parent")} className="p-2 hover:bg-blue-300 bg-blue-100 rounded-md">Parent</button>
                <button onClick={() => handleLoginWithRole("school")} className="p-2 hover:bg-blue-300 bg-blue-100 rounded-md">Admin</button>
            </div>
        </>
    )
}

// Url tseverleh logic
//   useEffect(() => {
//     if (window.location.hash) {
//       history.replaceState(null, "", window.location.pathname)
//     }
//   }, [])



