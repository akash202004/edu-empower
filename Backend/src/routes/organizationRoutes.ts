import express from "express"
import { createOrganizationDetails, deleteOrganizationDetails, getOrganizationDetails, updateOrganizationDetails, verifyOrganization } from "../controllers/organizationController";
import { authenticateAdmin } from "../middlewares/authenticateAdmin";



const router = express.Router();

// Routes
router.post("/", createOrganizationDetails);
router.get("/:id", getOrganizationDetails);
router.put("/:id", updateOrganizationDetails);
router.delete("/:id", deleteOrganizationDetails);
router.patch("/organizations/:id/verify", authenticateAdmin, verifyOrganization);


export default router;
