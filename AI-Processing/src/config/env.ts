import dotenv from "dotenv";
dotenv.config();

export const config = {
  backendUrl: process.env.BACKEND_URL || "http://localhost:5000",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
};
