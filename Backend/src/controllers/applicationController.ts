import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import { ApplicationStatus } from "@prisma/client";
import { sendErrorResponse } from "../utils/errorResponse";
import { sendSuccessResponse } from "../utils/successResponse";

// Create Application with a new scholarship reason
export const createApplication = async (req: Request, res: Response) => {
  try {
    const { studentId, scholarshipId, scholarshipReason } = req.body;

    if (!studentId || !scholarshipId || !scholarshipReason) {
      sendErrorResponse(res, 400, "Missing required fields");
      return;
    }

    const existingApplication = await prisma.application.findFirst({
      where: { studentId, scholarshipId },
    });

    if (existingApplication) {
      sendErrorResponse(
        res,
        400,
        "You have already applied for this scholarship."
      );
      return;
    }

    const application = await prisma.application.create({
      data: { studentId, scholarshipId, scholarshipReason, status: "PENDING" },
    });

    sendSuccessResponse(res, 201, application);
  } catch (error) {
    console.error("Error creating application:", error);
    sendErrorResponse(res, 500, "Failed to create application");
    return;
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
      sendErrorResponse(res, 400, "Application Id is invalid");
      return;
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { scholarshipReason },
    });

    sendSuccessResponse(res, 200, updatedApplication);
  } catch (error) {
    console.error("Error updating scholarship reason:", error);
    sendErrorResponse(res, 500, "Failed to update scholarship reason");
    return;
  }
};

// Update Application Status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingApplication = await prisma.application.findUnique({
      where: { id },
    });
    if (!existingApplication) {
      sendErrorResponse(res, 400, "Application Id is invalid");
      return;
    }

    if (!Object.values(ApplicationStatus).includes(status)) {
      sendErrorResponse(res, 400, "Status is Invalid");
      return;
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    });

    sendSuccessResponse(res, 200, updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    sendErrorResponse(res, 500, "Failed to update application");
    return;
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
    sendSuccessResponse(res, 200, applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    sendErrorResponse(res, 500, "Failed to fetch applications");
    return;
  }
};

// Get Application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const applicationId = await prisma.application.findUnique({
      where: { id },
    });
    if (!applicationId) {
      sendErrorResponse(res, 400, "Invalid application ID");
      return;
    }

    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      sendErrorResponse(res, 404, "Application not found");
      return;
    }

    sendSuccessResponse(res, 200, application);
  } catch (error) {
    console.error("Error fetching application:", error);
    sendErrorResponse(res, 500, "Failed to fetch application");
    return;
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
      sendErrorResponse(res, 404, "No applications found for this student.");
      return;
    }

    sendSuccessResponse(res, 200, applications);
  } catch (error) {
    console.error("Error fetching application:", error);
    sendErrorResponse(res, 500, "Failed to fetch application");
    return;
  }
};

// Delete Application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingApplication = await prisma.application.findUnique({
      where: { id },
    });
    if (!existingApplication) {
      sendErrorResponse(res, 404, "Application not found");
      return;
    }

    await prisma.application.delete({ where: { id } });
    sendSuccessResponse(res, 200, {
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    sendErrorResponse(res, 500, "Failed to delete application");
    return;
  }
};
