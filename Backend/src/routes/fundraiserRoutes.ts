import express from "express";
import {
  getFundraisers,
  getFundraiserById,
  createFundraiser,
  updateFundraiser,
  deleteFundraiser,
} from "../controllers/fundraiserController";

const router = express.Router();

router.get("/", getFundraisers);
router.get("/:id", getFundraiserById);
router.post("/", createFundraiser);
router.put("/:id", updateFundraiser);
router.delete("/:id", deleteFundraiser);

export default router;
