import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, income } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, income },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
