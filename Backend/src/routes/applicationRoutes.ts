import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController";
import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.post("/", verifyUser, createApplication);
router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.patch("/:id", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
