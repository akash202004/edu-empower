import express from "express"
import { createOrganizationDetails, deleteOrganizationDetails, getOrganizationDetails, updateOrganizationDetails } from "../controllers/organizationController";


const router = express.Router();

// Routes
router.post("/", createOrganizationDetails);
router.get("/:id", getOrganizationDetails);
router.put("/:id", updateOrganizationDetails);
router.delete("/:id", deleteOrganizationDetails);

module.exports = router;
