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
import bodyParser from "body-parser";
import express from "express";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("🚀 Welcome to our API! The server is running successfully.");
});

app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/fundraiser", fundraiserRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/disbursements", disbursementRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
