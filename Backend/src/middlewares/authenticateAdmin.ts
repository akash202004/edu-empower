import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prismaClient";
import { Role } from "@prisma/client";

// Middleware to check if user is an admin
export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. No user found." });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== Role.ADMIN) {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
    }

    next();
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
