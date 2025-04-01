import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import { DisbursementStatus } from "@prisma/client";
import { sendErrorResponse } from "../utils/errorResponse";
import { sendSuccessResponse } from "../utils/successResponse";

// Create Disbursement
export const createDisbursement = async (req: Request, res: Response) => {
  try {
    const { scholarshipId, studentId, amount, status } = req.body;

    const [scholarship, student] = await prisma.$transaction([
      prisma.scholarship.findUnique({ where: { id: scholarshipId } }),
      prisma.studentDetails.findUnique({ where: { userId: studentId } }),
    ]);
    
    if (!scholarship || !student) {
      sendErrorResponse(res, 400, "Invalid Scholarship or Student ID");
      return;
    }

    if (!Object.values(DisbursementStatus).includes(status)) {
      sendErrorResponse(res, 400, "Invalid status value");
      return;
    }

    const disbursement = await prisma.disbursement.create({
      data: { scholarshipId, studentId, amount, status },
    });

    sendSuccessResponse(res, 201, disbursement);
  } catch (error) {
    console.error("Error creating disbursement:", error);
    sendErrorResponse(res, 500, "Failed to create disbursement");
  }
};

// Get All Disbursements
export const getAllDisbursements = async (req: Request, res: Response) => {
  try {
    const disbursements = await prisma.disbursement.findMany();
    sendSuccessResponse(res, 200, disbursements);
  } catch (error) {
    console.error("Error fetching disbursements:", error);
    sendErrorResponse(res, 500, "Failed to fetch disbursements");
  }
};

// Get Disbursement by ID
export const getDisbursementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingDisbursement = await prisma.disbursement.findUnique({
      where: { id },
    });

    if (!existingDisbursement) {
      sendErrorResponse(res, 404, "Disbursement not found");
      return;
    }

    sendSuccessResponse(res, 200, existingDisbursement);
  } catch (error) {
    console.error("Error fetching disbursement:", error);
    sendErrorResponse(res, 500, "Failed to fetch disbursement");
  }
};

// Update Disbursement Status
export const updateDisbursementStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingDisbursement = await prisma.disbursement.findUnique({
      where: { id },
    });

    if (!existingDisbursement) {
      sendErrorResponse(res, 404, "Disbursement not found");
      return;
    }

    if (!Object.values(DisbursementStatus).includes(status)) {
      sendErrorResponse(res, 400, "Invalid status value");
      return;
    }

    const updatedDisbursement = await prisma.disbursement.update({
      where: { id },
      data: { status },
    });

    sendSuccessResponse(res, 200, updatedDisbursement);
  } catch (error) {
    console.error("Error updating disbursement status:", error);
    sendErrorResponse(res, 500, "Failed to update disbursement");
  }
};

// Delete Disbursement
export const deleteDisbursement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingDisbursement = await prisma.disbursement.findUnique({
      where: { id },
    });

    if (!existingDisbursement) {
      sendErrorResponse(res, 404, "Disbursement not found");
      return;
    }

    await prisma.disbursement.delete({ where: { id } });
    sendSuccessResponse(res, 200, { message: "Disbursement deleted successfully" });
  } catch (error) {
    console.error("Error deleting disbursement:", error);
    sendErrorResponse(res, 500, "Failed to delete disbursement");
  }
};
