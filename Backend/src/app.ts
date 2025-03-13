import userRoutes from "./routes/userRoutes";
import scholarshipRoutes from "./routes/scholarshipRoutes";
import fileUploadRoutes from "./routes/fileUploadRoutes";
import donationRoutes from "./routes/donationRoutes";
import fundraiserRoutes from "./routes/fundraiserRoutes";
import disbursementRoutes from "./routes/disbursementRoutes";
import organizationRoutes from "./routes/organizationRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import studentRoutes from "./routes/studentRoutes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({ extended: true, limit: "16KB" }))
app.use(express.json({ limit: "16KB" }))

app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/fundraiser", fundraiserRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/disbursements", disbursementRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/applications", applicationRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
