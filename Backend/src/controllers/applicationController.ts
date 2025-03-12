import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Create Application
export const createApplication = async (req: Request, res: Response) => {
  try {
    const { studentId, scholarshipId, status } = req.body;
    const application = await prisma.application.create({
      data: { studentId, scholarshipId, status },
    });
    res.status(201).json(application);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Failed to create application" });
  }
};

// Get All Applications
export const getAllApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany();
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

// Get Application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ error: "Failed to fetch application" });
  }
};

// Update Application Status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Failed to update application" });
  }
};

// Delete Application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.application.delete({ where: { id } });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};
