import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  name: string;
  email: string;
  income?: number;
  userId: string;
}

// Register or update a user
export const registerOrUpdateUser = async (req: Request, res: Response) => {
  const { name, email, income, userId }: User = req.body;

  try {
    let user = await prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      user = await prisma.user.update({
        where: { id: userId },
        data: { name, email, income },
      });
    } else {
      user = await prisma.user.create({
        data: { id: userId, name, email, income },
      });
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "User registration or update failed" });
  }
};

// Fetch a single user by ID
export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Fetch all users
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
