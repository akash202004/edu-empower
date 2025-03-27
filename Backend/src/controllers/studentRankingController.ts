import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Create a new ranking
export const createRanking = async (req: Request, res: Response) => {
  const { applicationId, scholarshipId, score, rank } = req.body;
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!application) {
      res.status(404).json({ error: "Application not found!" });
      return;
    }

    const scholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });
    if (!scholarship) {
      res.status(404).json({ error: "Scholarship not found!" });
      return;
    }

    const newRanking = await prisma.studentRanking.create({
      data: {
        applicationId,
        scholarshipId,
        score,
        rank,
      },
    });

    res.status(201).json(newRanking);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update ranking
export const updateRanking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { score, rank } = req.body;

  try {
    const existingRanking = await prisma.studentRanking.findUnique({
      where: { id },
    });

    if (!existingRanking) {
      res.status(404).json({ error: "Ranking not found!" });
      return;
    }

    if (score !== undefined) {
      if (typeof score !== "number" || score < 0 || score > 100) {
        res.status(400).json({
          error: "Invalid score! Must be a number between 0 and 100.",
        });
        return;
      }
    }

    if (rank !== undefined) {
      if (!Number.isInteger(rank) || rank < 1) {
        res
          .status(400)
          .json({ error: "Invalid rank! Must be a positive integer." });
        return;
      }
    }

    const updatedRanking = await prisma.studentRanking.update({
      where: { id },
      data: { score, rank },
    });

    res.json(updatedRanking);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all student rankings
export const getAllRankings = async (req: Request, res: Response) => {
  try {
    const rankings = await prisma.studentRanking.findMany({
      include: {
        application: true,
        scholarship: true,
      },
    });
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get ranking by ID
export const getRankingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ranking = await prisma.studentRanking.findUnique({
      where: { id },
      include: {
        application: true,
        scholarship: true,
      },
    });

    if (!ranking) {
      res.status(404).json({ message: "Ranking not found" });
      return;
    }

    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete ranking
export const deleteRanking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingRanking = await prisma.studentRanking.findUnique({
      where: { id },
    });

    if (!existingRanking) {
      res.status(404).json({ error: "Ranking not found!" });
      return;
    }

    await prisma.studentRanking.delete({
      where: { id },
    });

    res.json({ message: "Ranking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
