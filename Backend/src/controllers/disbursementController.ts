import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Create Disbursement
export const createDisbursement = async (req: Request, res: Response) => {
  try {
    const { scholarshipId, studentId, amount, status } = req.body;
    const disbursement = await prisma.disbursement.create({
      data: { scholarshipId, studentId, amount, status },
    });
    res.status(201).json(disbursement);
  } catch (error) {
    console.error("Error creating disbursement:", error);
    res.status(500).json({ error: "Failed to create disbursement" });
  }
};

// Get All Disbursements
export const getAllDisbursements = async (_req: Request, res: Response) => {
  try {
    const disbursements = await prisma.disbursement.findMany();
    res.status(200).json(disbursements);
  } catch (error) {
    console.error("Error fetching disbursements:", error);
    res.status(500).json({ error: "Failed to fetch disbursements" });
  }
};

// Get Disbursement by ID
export const getDisbursementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const disbursement = await prisma.disbursement.findUnique({
      where: { id },
    });

    if (!disbursement) {
      res.status(404).json({ error: "Disbursement not found" });
      return;
    }

    res.status(200).json(disbursement);
  } catch (error) {
    console.error("Error fetching disbursement:", error);
    res.status(500).json({ error: "Failed to fetch disbursement" });
  }
};

// Update Disbursement Status
export const updateDisbursementStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedDisbursement = await prisma.disbursement.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(updatedDisbursement);
  } catch (error) {
    console.error("Error updating disbursement:", error);
    res.status(500).json({ error: "Failed to update disbursement" });
  }
};

// Delete Disbursement
export const deleteDisbursement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.disbursement.delete({ where: { id } });
    res.status(200).json({ message: "Disbursement deleted successfully" });
  } catch (error) {
    console.error("Error deleting disbursement:", error);
    res.status(500).json({ error: "Failed to delete disbursement" });
  }
};
