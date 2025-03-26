import { Request, Response } from "express";

export const getStudentRank = (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
};
