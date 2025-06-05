import axios from "axios";

export const uploadCloudinary = async (
    file: File,
    cloudName: string,
    uploadPreset: string,
    resourceType: "image" | "raw" | "video" = "image"
): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        formData
    );

    return response.data.secure_url as string;
};


//USAGE = 
// await uploadImageToCloudinary(
//   selectedFile,
//   "my_cloud_name",
//   "my_upload_preset",
//   "image"
// );