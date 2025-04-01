import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): Response => {
  return res.status(statusCode).json({ error: message });
};
