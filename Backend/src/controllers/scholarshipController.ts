import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Get all scholarships
export const getScholarships = async (req: Request, res: Response) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      include: {
        fundraiser: true,
        organization: true,
        applications: true,
        disbursements: true,
      },
    });
    res.status(200).json(scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).json({ error: "Failed to fetch scholarships" });
  }
};

// Get a single scholarship by ID
export const getScholarshipById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const scholarship = await prisma.scholarship.findUnique({
      where: { id },
      include: {
        fundraiser: true,
        organization: true,
        applications: true,
        disbursements: true,
      },
    });

    if (!scholarship) {
      res.status(404).json({ error: "Scholarship not found" });
      return;
    }

    res.status(200).json(scholarship);
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    res.status(500).json({ error: "Failed to fetch scholarship" });
  }
};

// Create a new scholarship
export const createScholarship = async (req: Request, res: Response) => {
  const { title, description, totalAmount, fundraiserId, organizationId } =
    req.body;

  try {
    const newScholarship = await prisma.scholarship.create({
      data: {
        title,
        description,
        totalAmount,
        fundraiserId,
        organizationId,
        // maxFamilyIncome,
        // expiredAt,
      },
    });

    res.status(201).json(newScholarship);
  } catch (error) {
    console.error("Error creating scholarship:", error);
    res.status(500).json({ error: "Failed to create scholarship" });
  }
};

// Update a scholarship
export const updateScholarship = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedScholarship = await prisma.scholarship.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(updatedScholarship);
  } catch (error) {
    console.error("Error updating scholarship:", error);
    res.status(500).json({ error: "Failed to update scholarship" });
  }
};

// Delete a scholarship
export const deleteScholarship = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.scholarship.delete({ where: { id } });
    res
      .status(200)
      .json({ id: id, message: "Scholarship deleted successfully" });
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    res.status(500).json({ error: "Failed to delete scholarship" });
  }
};
