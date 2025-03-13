import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prismaClient";
import { Role } from "@prisma/client";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        studentDetails: { select: { verified: true } },
        organizationDetails: { select: { verified: true } },
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    let isVerified = false;

    if (user.role === Role.STUDENT && user.studentDetails?.verified) {
      isVerified = true;
    } else if (
      user.role === Role.ORGANIZATION &&
      user.organizationDetails?.verified
    ) {
      isVerified = true;
    }

    if (!isVerified) {
      res.status(403).json({ error: "User is not verified" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in verifyUser middleware:", error);
    res.status(500).json({ error: "Failed to verify user" });
  }
};
