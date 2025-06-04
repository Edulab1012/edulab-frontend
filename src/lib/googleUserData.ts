import { GoogleUserMetadata } from "@/constants/types/googleUserDataType"
import { useTestUserStore } from "@/hooks/useUserStore"
import supabase from "@/utils/supabase"
import axios from "axios"

export const getUserAndPost = async (endpoint: string, role?: string) => {

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
        }

        const response = await axios.post(endpoint, userData)

        const backendUser = response.data.testUser
        useTestUserStore.getState().setUser(backendUser) // ✅ saving backend response

        console.log("✅ Saved backend user to store:", backendUser)
        return backendUser
    } catch (err) {
        console.log("Error in getUserAndPost:", err)
        return null
    }
}