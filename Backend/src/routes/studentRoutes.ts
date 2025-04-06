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

router.post(
  "/",
  upload.fields([
    { name: "tenthResult", maxCount: 1 },
    { name: "twelfthResult", maxCount: 1 },
    { name: "incomeCert", maxCount: 1 },
    { name: "domicileCert", maxCount: 1 },
  ]),
  createStudentDetails
);

router.get("/:userId", getStudentDetails);
router.put(
  "/:userId",
  upload.fields([
    { name: "tenthResult", maxCount: 1 },
    { name: "twelfthResult", maxCount: 1 },
    { name: "incomeCert", maxCount: 1 },
    { name: "domicileCert", maxCount: 1 },
  ]),
  updateStudentDetails
);
router.put("/verify/:userId", updateStudentVerifiedStatus);
router.delete("/:userId", deleteStudentDetails);

export default router;
