import express from "express";
import {
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  getActiveScholarships,
  getExpiredScholarships,
  getUpcomingScholarships,
} from "../controllers/scholarshipController";
// import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.get("/filter/active", getActiveScholarships);
router.get("/filter/upcoming", getUpcomingScholarships);
router.get("/filter/expired", getExpiredScholarships);

router.get("/", getScholarships);
router.get("/:id", getScholarshipById);
router.post("/", createScholarship);
router.put("/:id", updateScholarship);
router.delete("/:id", deleteScholarship);

export default router;
