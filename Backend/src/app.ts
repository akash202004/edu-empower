import path from "path";
import scholarshipRoutes from "./routes/scholarshipRoutes";
import fileUploadRoutes from "./routes/fileUploadRoutes";
import donationRoutes from "./routes/donationRoutes";
import fundraiserRoutes from "./routes/fundraiserRoutes";
import disbursementRoutes from "./routes/disbursementRoutes";
import organizationRoutes from "./routes/organizationRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import studentRoutes from "./routes/studentRoutes";
import transactionRoutes from "./routes/razorpayRoutes"
import studentRankingRoutes from "./routes/studentRankingRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/fundraiser", fundraiserRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/disbursements", disbursementRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/ranking", studentRankingRoutes);
app.use("/api/transaction", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
