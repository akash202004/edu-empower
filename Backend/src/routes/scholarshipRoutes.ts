import express from "express";
import {
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  getActiveScholarships,
  getExpiredScholarships,
} from "../controllers/scholarshipController";
// import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.get("/active", getActiveScholarships);  // ✅ Now matches first
router.get("/expired", getExpiredScholarships);

router.get("/", getScholarships);
router.get("/:id", getScholarshipById);
router.post("/", createScholarship); 
router.put("/:id", updateScholarship);
router.delete("/:id", deleteScholarship);

export default router;
