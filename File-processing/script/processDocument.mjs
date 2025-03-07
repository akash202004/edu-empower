import axios from "axios";
import Tesseract from "tesseract.js";
import { PrismaClient } from "@prisma/client";
import { fromBuffer } from "pdf2pic";
import cloudinary from "cloudinary";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret"
});

// Extract Name & Income from text
const extractInfo = (text) => {
    const nameMatch = text.match(/cernpm install pdf-lib sharptify that\s+([A-Z\s]+)/i);
    const name = nameMatch ? nameMatch[1].trim() : "Unknown";

    const incomeMatch = text.match(/Income:\s*\$?([\d,]+)/);
    const income = incomeMatch ? incomeMatch[1] : "Not Found";

    return { name, income };
};

// Fetch PDF URL from Prisma
const fetchPdfUrl = async (userId) => {
    const document = await prisma.document.findUnique({
        where: { id: userId },
    });
    return document?.cloudinaryUrl || null;
};

// Process PDF from Cloudinary
const processDocument = async (userId) => {
    try {
        console.log("Fetching PDF URL from database...");
        const pdfUrl = await fetchPdfUrl(userId);
        if (!pdfUrl) throw new Error("PDF URL not found for user");

        console.log("Downloading PDF from Cloudinary...");
        const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

        console.log("Converting PDF to images...");
        const pdfToImg = fromBuffer(response.data, {
            density: 300, // Higher density for better OCR
            savePath: "./tmp",
            format: "png",
            width: 1000,
        });

        const images = await pdfToImg(1, true); // Convert first page
        if (!images.path) throw new Error("Failed to convert PDF to images");

        console.log("Performing OCR...");
        const { data: { text } } = await Tesseract.recognize(images.path, "eng");

        console.log("Extracting Name & Income...");
        const { name, income } = extractInfo(text);

        console.log("Saving extracted data to Prisma...");
        const savedData = await prisma.document.update({
            where: { id: userId },
            data: { name, income },
        });

        console.log("Stored in Prisma:", savedData);
    } catch (error) {
        console.error("Error processing document:", error);
    } finally {
        await prisma.$disconnect();
    }
};

// Example usage
const userId = "your_user_id_here"; // Replace with actual User ID
processDocument(userId);
