import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import scholarshipRoutes from "./routes/scholarshipRoutes";
import fileUploadRoutes from "./routes/fileUploadRoutes";
import donationRoutes from "./routes/donationRoutes"
import fundraiserRoutes from "./routes/fundraiserRoutes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/fundraiser", fundraiserRoutes);
app.use("/api/donations", donationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
