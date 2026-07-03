import axios from "axios"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const validateFile = (file: File): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, or WEBP images are allowed.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Image must be under 5MB.";
  }
  return null;
};

export const uploadImageToCloudinary = async (file: File, token: string) => {
const signRes = await axios.get(`${API_BASE}/api/upload/signature`, {
    headers: { Authorization: `Bearer ${token}` }
});

const { signature, timestamp, apiKey, cloudName, folder } = signRes.data.data;

const formData = new FormData();
formData.append("file", file);
formData.append("api_key", apiKey),
formData.append("timestamp", timestamp.toString());
formData.append("signature", signature)
formData.append("folder", folder);

const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
});

const data = await res.json();

console.log("Cloudinary response:", data);

if (!res.ok) {
  throw new Error(data.error?.message || "Image upload failed");
}

return data.secure_url;
}