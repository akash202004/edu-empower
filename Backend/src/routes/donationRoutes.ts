import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByFundraiser,
  deleteDonation,
} from "../controllers/donationController";
import { verifyUser } from "../middlewares/verifyUser";

const router = express.Router();

router.post("/", createDonation);
router.get("/", getAllDonations);
router.get("/:id", getDonationById);
router.get("/fundraiser/:fundraiserId", getDonationsByFundraiser);
router.delete("/:id", deleteDonation);

export default router;
