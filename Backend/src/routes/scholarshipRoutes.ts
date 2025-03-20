import express from "express";
import {
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} from "../controllers/scholarshipController";
import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.get("/", getScholarships);
router.get("/:id", getScholarshipById);
router.post("/", createScholarship); 
router.put("/:id",verifyUser, updateScholarship);
router.delete("/:id", deleteScholarship);

export default router;
