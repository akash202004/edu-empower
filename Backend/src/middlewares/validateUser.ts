import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

// Middleware to validate user registration/update data
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, name, email, role } = req.body;

  // Check if required fields exist
  if (!userId || !name || !email || !role) {
    res
      .status(400)
      .json({ error: "Missing required fields: userId, name, email, or role" });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  // Validate role
  const validRoles = Object.values(Role);
  if (!validRoles.includes(role)) {
    res
      .status(400)
      .json({ error: `Invalid role. Allowed roles: ${validRoles.join(", ")}` });
    return;
  }

  next();
};
