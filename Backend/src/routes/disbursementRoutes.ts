import express from "express";
import {
  createDisbursement,
  getAllDisbursements,
  getDisbursementById,
  updateDisbursementStatus,
  deleteDisbursement,
} from "../controllers/disbursementController";

const router = express.Router();

router.post("/", createDisbursement);
router.get("/", getAllDisbursements);
router.get("/:id", getDisbursementById);
router.put("/:id", updateDisbursementStatus);
router.delete("/:id", deleteDisbursement);

export default router;
