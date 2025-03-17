import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

const normalizePath = (path: string) => path.replace(/\\/g, "/");

// Create Student Details
export const createStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId, fatherName, motherName } = req.body;
    if (!userId || !fatherName || !motherName) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (existingStudent) {
      res.status(400).json({ error: "Student details already exist" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const tenthResult = files?.["tenthResult"]?.[0]?.path
      ? normalizePath(files["tenthResult"][0].path)
      : "";
    const twelfthResult = files?.["twelfthResult"]?.[0]?.path
      ? normalizePath(files["twelfthResult"][0].path)
      : "";
    const incomeCert = files?.["incomeCert"]?.[0]?.path
      ? normalizePath(files["incomeCert"][0].path)
      : "";

    const student = await prisma.studentDetails.create({
      data: {
        userId,
        fatherName,
        motherName,
        tenthResult,
        twelfthResult,
        incomeCert,
      },
    });

    res
      .status(201)
      .json({ message: "Student details created successfully", student });
  } catch (error) {
    console.error("Error creating student details:", error);
    res.status(500).json({ error: "Failed to create student details" });
  }
};

// Update Student Details
export const updateStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { fatherName, motherName } = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (!existingStudent) {
      res.status(404).json({ error: "Student details not found" });
      return;
    }

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const updateData: Record<string, any> = {};

    if (fatherName) updateData.fatherName = fatherName;
    if (motherName) updateData.motherName = motherName;
    if (files?.["tenthResult"]?.[0])
      updateData.tenthResult = normalizePath(files["tenthResult"][0].path);
    if (files?.["twelfthResult"]?.[0])
      updateData.twelfthResult = normalizePath(files["twelfthResult"][0].path);
    if (files?.["incomeCert"]?.[0])
      updateData.incomeCert = normalizePath(files["incomeCert"][0].path);

    const updatedStudent = await prisma.studentDetails.update({
      where: { userId },
      data: updateData,
    });

    res.status(200).json({
      message: "Student details updated successfully",
      updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ error: "Failed to update student details" });
  }
};

// Get Student Details by userId
export const getStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const student = await prisma.studentDetails.findUnique({
      where: { userId },
      include: { user: { select: { email: true } } },
    });

    if (!student) {
      res.status(404).json({ error: "Student details not found" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Failed to retrieve student details" });
  }
};

// Delete Student Details
export const deleteStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (!existingStudent) {
      res.status(404).json({ error: "Student details not found" });
      return;
    }

    await prisma.studentDetails.delete({ where: { userId } });

    res.status(200).json({ message: "Student details deleted successfully" });
  } catch (error) {
    console.error("Error deleting student details:", error);
    res.status(500).json({ error: "Failed to delete student details" });
  }
};
