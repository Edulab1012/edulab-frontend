import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";

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

        // Update student avatar in backend
        try {
            const studentId = localStorage.getItem("studentId");
            if (!studentId) throw new Error("Student ID not found in localStorage");

            const res = await axios.put(`${BASE_URL}student/${studentId}/avatar`, {
                avatarUrl: secureUrl,
            });
            console.log("Avatar updated successfully:", res.data);

        } catch (err) {
            console.error("Failed to update avatar in backend:", err);
        }

        return secureUrl;
    } catch (error) {
        console.error("❌ Error uploading image:", error);
        throw error;
    }
};

export const uploadBgCloudinary = async (
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

        // Update student background in backend
        try {
            const studentId = localStorage.getItem("studentId");
            if (!studentId) throw new Error("Student ID not found in localStorage");

            const res = await axios.put(`${BASE_URL}student/${studentId}/bgImage`, {
                bgUrl: secureUrl,
            });
            console.log("Background updated successfully:", res.data);

        } catch (err) {
            console.error("Failed to update background in backend:", err);
        }

        return secureUrl;
    } catch (error) {
        console.error("❌ Error uploading background image:", error);
        throw error;
    }
};
