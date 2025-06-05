'use client'
import { jwtDecode } from 'jwt-decode';
import { GoogleUserMetadata } from "@/constants/types/googleUserDataType"
import { useStudentStore } from "@/hooks/useStudentStore"
import supabase from "@/utils/supabase"
import axios from "axios"
import { DecodedTokenType } from '@/app/student/(dashboard)/accountProfile/components/types';
import { useExistingUserStore } from '@/hooks/existingUser';


export const getUserAndPost = async (endpoint: string, role?: string, classId?: string | null) => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) throw error || new Error("No user found");

        const metadata = user.user_metadata as GoogleUserMetadata;

        const userData = {
            id: user.id,
            email: user.email ?? "",
            fullName: metadata.full_name,
            avatarUrl: metadata.avatar_url,
            role: role,
            classId: classId,
        };

        const response = await axios.post(endpoint, userData);

        localStorage.setItem("userId", response?.data?.user?.id);
        localStorage.setItem("teacherId", response?.data?.teacher?.id);
        localStorage.setItem("studentId", response?.data?.student?.id);
        localStorage.setItem("token", response?.data?.token);

        if (response.data.token) {
            const decoded = jwtDecode<DecodedTokenType>(response.data.token);
            const existingUser = decoded.existingUser;
            if (!decoded.existingUser.student) return;
            const student = decoded.existingUser.student;
            // ✅ Save to Zustand
            useExistingUserStore.getState().setUser({
                id: existingUser.id,
                username: existingUser.username,
                phoneNumber: existingUser.phoneNumber ?? "",
                email: existingUser.email,
                role: existingUser.role,
                avatarUrl: existingUser.avatarUrl,
                password: existingUser.password ?? "",
                classId: existingUser.classId,
                className: existingUser.className
            });
      
            useStudentStore.getState().setStudent({
                firstName: student.firstName ?? "",
                lastName: student.lastName ?? "",
                fullName: `${student.firstName} ${student.lastName}`,
                email: student.email,
                avatarUrl: student.avatarUrl ?? "",
                bio: student.bio ?? "",
                backgroundUrl: student.backgroundUrl ?? "",
                phoneNumber: student.phoneNumber ?? "",
                gender: student.gender ?? "",
                classId: student.classId,
                className: student.class ?? "",
                teacher: student.teacher,
                bgImage: student.bgImage ?? "",

            });

            return decoded;
        }
    } catch (error) {
        console.log("Error in getUserAndPost:", error);

    }
};