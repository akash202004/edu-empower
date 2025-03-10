import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

// Register or update a user
export const registerOrUpdateUser = async (req: Request, res: Response) => {
  const {
    userId,
    name,
    email,
    role,
    verified,
  }: {
    userId: string;
    name: string;
    email: string;
    role: Role;
    verified?: boolean;
  } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { name, email, role, verified },
      create: { id: userId, name, email, role, verified: verified ?? false },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in registerOrUpdateUser:", error);
    res.status(500).json({ error: "User registration or update failed" });
  }
};

// Fetch a single user by ID (with related data)
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
      include: {
        fundraisers: true,
        donations: true,
        scholarships: true,
        applications: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Fetch all users with role filtering
export const getAllUsers = async (req: Request, res: Response) => {
  const { role } = req.query;

  try {
    const users = await prisma.user.findMany({
      where: role ? { role: role as Role } : {},
      include: {
        fundraisers: true,
        donations: true,
        scholarships: true,
        applications: true,
        disbursements: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
