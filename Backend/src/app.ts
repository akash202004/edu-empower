<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import studentRoutes from './routes/studentRoutes';
import userRoutes from './routes/userRoutes';
// Import other routes as needed
=======
import userRoutes from "./routes/userRoutes";
import scholarshipRoutes from "./routes/scholarshipRoutes";
import fileUploadRoutes from "./routes/fileUploadRoutes";
import donationRoutes from "./routes/donationRoutes";
import fundraiserRoutes from "./routes/fundraiserRoutes";
import disbursementRoutes from "./routes/disbursementRoutes";
import organizationRoutes from "./routes/organizationRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import studentRoutes from "./routes/studentRoutes";
import studentRankRoutes from "./routes/studentRankRoutes"
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
>>>>>>> b79906e3bd08aed3acf3107d02998105744e0ee8

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);
// Add other routes as needed

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

<<<<<<< HEAD
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
app.use("/api/rank", studentRankRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/fundraiser", fundraiserRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/disbursements", disbursementRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/students", studentRoutes);
>>>>>>> b79906e3bd08aed3acf3107d02998105744e0ee8

export default app;
