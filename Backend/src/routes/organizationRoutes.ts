import express from "express";
import {
  getOrganizationDetails,
  updateOrganizationVerification,
} from "../controllers/organizationController";

const router = express.Router();

router.get("/:userId", getOrganizationDetails);
router.put("/:userId/verify", updateOrganizationVerification);

export default router;
