import { GoogleUserMetadata } from "@/constants/types/googleUserDataType"
import { useTestUserStore } from "@/hooks/useUserStore"
import supabase from "@/utils/supabase"
import axios from "axios"

export const getUserAndPost = async (endpoint: string, role?: string, classId?: string | null) => {

    try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error || !user) throw error || new Error("No user found")

        const metadata = user.user_metadata as GoogleUserMetadata

        const userData = {
            id: user.id,
            email: user.email ?? "",
            fullName: user.user_metadata.full_name,
            avatarUrl: user.user_metadata.avatar_url,
            provider: user.user_metadata.provider,
            role: role,
            classId: classId
        }

        const response = await axios.post(endpoint, userData)
        console.log(response);
        localStorage.setItem("userId", response?.data?.user?.id)
        localStorage.setItem("teacherId", response?.data?.teacher?.id)
        localStorage.setItem("studentId", response?.data?.student?.id)
        localStorage.setItem("token", response?.data?.token);

        const backendUser = response.data
        // useTestUserStore.getState().setUser(backendUser)

        console.log("✅ Saved backend user to store:", backendUser)
        return backendUser
    } catch (err) {
        console.log("Error in getUserAndPost:", err)
        return null
    }
}