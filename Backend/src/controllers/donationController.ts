import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Create a new donation
export const createDonation = async (req: Request, res: Response) => {
  try {
    const { donorId, fundraiserId, amount } = req.body;

    if (!donorId || !fundraiserId || amount === undefined) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      res.status(400).json({ error: "Invalid donation amount" });
      return;
    }

    const donation = await prisma.donation.create({
      data: { donorId, fundraiserId, amount },
    });

    res.status(201).json(donation);
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Failed to create donation" });
  }
};

// Get all donations
export const getAllDonations = async (_req: Request, res: Response) => {
  try {
    const donations = await prisma.donation.findMany({
      include: { donor: true, fundraiser: true },
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// Get a single donation by ID
export const getDonationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: { donor: true, fundraiser: true },
    });

    if (!donation) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error("Error fetching donation:", error);
    res.status(500).json({ error: "Failed to fetch donation" });
  }
};

// Get all donations for a specific fundraiser
export const getDonationsByFundraiser = async (req: Request, res: Response) => {
  try {
    const { fundraiserId } = req.params;

    const donations = await prisma.donation.findMany({
      where: { fundraiserId },
      include: { donor: true },
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// Delete a donation
export const deleteDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingDonation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!existingDonation) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }

    await prisma.donation.delete({ where: { id } });

    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({ error: "Failed to delete donation" });
  }
};
