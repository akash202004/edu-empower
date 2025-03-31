import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import { validateScholarshipData } from "../utils/scholarshipDetailsValidation";
import { Role } from "@prisma/client";

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

// create scholarship
export const createScholarship = async (req: Request, res: Response) => {
  try {
    const validationResult = validateScholarshipData(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.format() });
      return;
    }

    const {
      title,
      description,
      totalAmount,
      fundraiserId,
      organizationId,
      maxFamilyIncome,
      expiredAt,
    } = validationResult.data;

    const currentDate = new Date();
    const expiryDate = new Date(expiredAt);

    if (expiryDate <= currentDate) {
      res.status(400).json({ error: "Expiry date must be in the future" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: organizationId },
      include: { organizationDetails: true },
    });

    if (!user) {
      res.status(403).json({ error: "User dosen't exists" });
      return;
    }

    if (user.role !== Role.ORGANIZATION) {
      res.status(403).json({ error: "User don't have a organization role" });
      return;
    }

    if (!user.organizationDetails) {
      res.status(403).json({ error: "User must have a organization details" });
      return;
    }

    if (!user.organizationDetails.verified) {
      res.status(403).json({ error: "User must be a verified organization" });
      return;
    }

    const newScholarship = await prisma.scholarship.create({
      data: {
        title,
        description,
        totalAmount,
        fundraiserId,
        organizationId,
        expiredAt,
        maxFamilyIncome: maxFamilyIncome || 0,
      },
    });

    res.status(201).json(newScholarship);
  } catch (error) {
    console.error("Error creating scholarship:", error);
    res.status(500).json({ error: "Failed to create scholarship" });
  }
};

// update scholarship
export const updateScholarship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validationResult = validateScholarshipData(req.body);

    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.format() });
      return;
    }

    const {
      title,
      description,
      totalAmount,
      fundraiserId,
      organizationId,
      maxFamilyIncome,
      expiredAt,
    } = validationResult.data;

    const scholarship = await prisma.scholarship.findUnique({ where: { id } });

    if (!scholarship) {
      res.status(404).json({ error: "Scholarship not found" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: organizationId },
      include: { organizationDetails: true },
    });

    if (!user) {
      res.status(403).json({ error: "User doesn't exist" });
      return;
    }

    if (user.role !== Role.ORGANIZATION) {
      res.status(403).json({ error: "User doesn't have an organization role" });
      return;
    }

    if (!user.organizationDetails || !user.organizationDetails.verified) {
      res
        .status(403)
        .json({ error: "User must be a verified organization with details" });
      return;
    }

    if (scholarship.organizationId !== organizationId) {
      res
        .status(403)
        .json({ error: "You are not authorized to update this scholarship" });
      return;
    }

    if (new Date(scholarship.expiredAt) < new Date()) {
      res.status(400).json({ error: "Cannot update an expired scholarship" });
      return;
    }

    const currentDate = new Date();
    const newExpiryDate = new Date(expiredAt);

    if (newExpiryDate <= currentDate) {
      res.status(400).json({ error: "New expiry date must be in the future" });
      return;
    }

    const updatedScholarship = await prisma.scholarship.update({
      where: { id },
      data: {
        title,
        description,
        totalAmount,
        fundraiserId,
        expiredAt,
        maxFamilyIncome: maxFamilyIncome || 0,
      },
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

// Get active scholarship
export const getActiveScholarships = async (req: Request, res: Response) => {
  try {
    const currentUTCDate = new Date();
    currentUTCDate.setUTCHours(0, 0, 0, 0);
    const { page = 1, limit = 5, organizationId, fundraiserId } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const whereClause: any = {
      expiredAt: { gt: currentUTCDate },
    };

    if (organizationId) whereClause.organizationId = organizationId;
    if (fundraiserId) whereClause.fundraiserId = fundraiserId;

    const [activeScholarships, totalCount] = await Promise.all([
      prisma.scholarship.findMany({
        where: whereClause,
        include: {
          fundraiser: true,
          organization: true,
          applications: true,
          disbursements: true,
        },
        orderBy: {
          expiredAt: "asc",
        },
        skip,
        take: Number(limit),
      }),
      prisma.scholarship.count({ where: whereClause }),
    ]);

    if (totalCount === 0) {
      res.status(200).json("No active scholarships");
      return;
    }

    res.status(200).json({
      success: true,
      data: activeScholarships,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error in getActiveScholarships:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get all expired
export const getExpiredScholarships = async (req: Request, res: Response) => {
  try {
    const currentUTCDate = new Date();
    currentUTCDate.setUTCHours(0, 0, 0, 0);
    const { page = 1, limit = 5, organizationId, fundraiserId } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const whereClause: any = {
      expiredAt: { lte: currentUTCDate },
    };

    if (organizationId) whereClause.organizationId = organizationId;
    if (fundraiserId) whereClause.fundraiserId = fundraiserId;

    const [expiredScholarships, totalCount] = await Promise.all([
      prisma.scholarship.findMany({
        where: whereClause,
        include: {
          fundraiser: true,
          organization: true,
          applications: true,
          disbursements: true,
        },
        orderBy: {
          expiredAt: "desc",
        },
        skip,
        take: Number(limit),
      }),
      prisma.scholarship.count({ where: whereClause }),
    ]);

    if (totalCount === 0) {
      res.status(200).json("No expired scholarships");
      return;
    }

    res.status(200).json({
      success: true,
      data: expiredScholarships,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching expired scholarships:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch expired scholarships",
    });
  }
};
