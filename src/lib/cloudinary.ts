import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";
import { useStudentStore } from "@/hooks/useStudentStore"; // optional if you want to update store

export const uploadCloudinary = async (
    file: File,
    resourceType: "image" | "video" | "raw" = "image"
): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "classhero");

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dbgvuiz2n/${resourceType}/upload`,
            formData
        );

        const secureUrl = response.data.secure_url as string;

        // 🧠 Take studentId from localStorage
        try {
            const studentId = localStorage.getItem("studentId");
            if (!studentId) throw new Error("Student ID not found in localStorage");

            // ✅ Send avatarUrl to backend
            const res = await axios.put(`${BASE_URL}student/${studentId}/avatar`, {
                avatarUrl: secureUrl,
            });
            console.log(res);

        } catch (err) {
            console.log(err);

        }


        return secureUrl;
    } catch (error) {
        console.log("❌ Error uploading image:", error);
        throw error;
    }
};