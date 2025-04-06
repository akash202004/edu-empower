import { Router } from "express";
import upload from "../middlewares/multerConfig";
import {
  createStudentDetails,
  getStudentDetails,
  updateStudentDetails,
  deleteStudentDetails,
  updateStudentVerifiedStatus,
} from "../controllers/studentController";

const router = Router();

router.post("/", createStudentDetails);

router.get("/:userId", getStudentDetails);
router.put("/:userId", updateStudentDetails);
router.put("/verify/:userId", updateStudentVerifiedStatus);
router.delete("/:userId", deleteStudentDetails);

export default router;
