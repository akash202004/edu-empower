import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Create Application with a new scholarship reason
export const createApplication = async (req: Request, res: Response) => {
  try {
    const { studentId, scholarshipId, scholarshipReason } = req.body;

    if (!studentId || !scholarshipId || !scholarshipReason) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    const existingApplication = await prisma.application.findFirst({
      where: { studentId, scholarshipId },
    });

    if (existingApplication) {
      res.status(400).json({
        error: "You have already applied for this scholarship.",
      });
      return;
    }

    const application = await prisma.application.create({
      data: { studentId, scholarshipId, scholarshipReason, status: "PENDING" },
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Failed to create application" });
  }
};

// Update Scholarship Reason for an Existing Application
export const updateScholarshipReason = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { scholarshipReason } = req.body;

    const existingApplication = await prisma.application.findUnique({
      where: { id },
    });

    if (!existingApplication) {
      res.status(404).json({ error: "Application not found." });
      return;
    }

    if (!scholarshipReason) {
      res.status(400).json({ error: "Scholarship reason is required." });
      return;
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { scholarshipReason },
    });

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating scholarship reason:", error);
    res.status(500).json({ error: "Failed to update scholarship reason" });
  }
};

// Update Application Status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ error: "Status is required." });
      return;
    }

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

// Get All Applications
export const getAllApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        student: true,
      },
    });
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

// Get Application by StudentID
export const getApplicationsByStudentId = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const applications = await prisma.application.findMany({
      where: { studentId: id },
    });

    if (!applications || applications.length === 0) {
      res
        .status(404)
        .json({ error: "No applications found for this student." });
      return;
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ error: "Failed to fetch application" });
  }
};

// Delete Application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const applications = await prisma.application.findUnique({
      where: { id },
    });
    if (!applications) {
      res
        .status(404)
        .json({ error: "No applications found for this student." });
      return;
    }

    await prisma.application.delete({ where: { id } });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};
