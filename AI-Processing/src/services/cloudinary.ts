import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export const fetchPDFUrls = async (): Promise<string[]> => {
  try {
    const result = await cloudinary.api.resources({ type: "upload", resource_type: "raw", format: "pdf" });
    return result.resources.map((file: any) => file.secure_url);
  } catch (error) {
    console.error("Error fetching PDFs from Cloudinary:", error);
    return [];
  }
};
