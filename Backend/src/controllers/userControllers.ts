import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { prisma } from "../config/prismaClient";
import { Role } from "@prisma/client"

// Register or update a user
export const registerOrUpdateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { userId, name, email, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (existingUser) {
      if (role && existingUser.role !== role) {
        res
          .status(403)
          .json({ error: "You cannot change your role after registration" });
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
      });

      res.status(200).json(updatedUser);
      return;
    } else {
      const newUser = await prisma.user.create({
        data: { id: userId, name, email, role },
      });

      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error("Error in registerOrUpdateUser:", error);
    res.status(500).json({ error: "User registration or update failed" });
    return;
  }
};

// Fetch a single user by ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
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

// Fetch all users with optional role filtering
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

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await prisma.disbursement.deleteMany({ where: { studentId: id } });
    await prisma.application.deleteMany({ where: { studentId: id } });
    await prisma.donation.deleteMany({ where: { donorId: id } });

    await prisma.fundraiser.deleteMany({ where: { organizationId: id } });
    await prisma.scholarship.deleteMany({ where: { organizationId: id } });

    await prisma.organizationDetails.deleteMany({ where: { userId: id } });
    await prisma.studentDetails.deleteMany({ where: { userId: id } });

    await prisma.user.delete({ where: { id } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
