import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig";

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_, file): Promise<{ folder: string; public_id: string; resource_type: string }> => ({
    folder: "student-documents", 
    public_id: `${file.fieldname}-${Date.now()}`,
    resource_type: file.mimetype === "application/pdf" ? "raw" : "auto",
  }),
});


// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
