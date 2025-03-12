import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Get Organization Details by User ID
export const getOrganizationDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const details = await prisma.organizationDetails.findUnique({
      where: { userId },
    });

    if (!details) {
      res.status(404).json({ error: "Organization details not found" });
      return;
    }

    res.status(200).json(details);
  } catch (error) {
    console.error("Error fetching organization details:", error);
    res.status(500).json({ error: "Failed to fetch organization details" });
  }
};

// Update Organization Verification
export const updateOrganizationVerification = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const { verified } = req.body;

    if (typeof verified !== "boolean") {
      res
        .status(400)
        .json({ error: "Invalid value for 'verified'. Must be a boolean." });
      return;
    }

    const existingDetails = await prisma.organizationDetails.findUnique({
      where: { userId },
    });

    if (!existingDetails) {
      res.status(404).json({ error: "Organization details not found" });
      return;
    }

    const updatedDetails = await prisma.organizationDetails.update({
      where: { userId },
      data: { verified },
    });

    res.status(200).json(updatedDetails);
  } catch (error) {
    console.error("Error updating organization verification:", error);
    res.status(500).json({ error: "Failed to update verification status" });
  }
};
