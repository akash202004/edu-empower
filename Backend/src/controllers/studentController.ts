import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

// Create Student Details
export const createStudentDetails = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fatherName,
      motherName,
      tenthResult,
      twelfthResult,
      incomeCert,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
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

// Get Student Details by userId
export const getStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const student = await prisma.studentDetails.findUnique({
      where: { userId },
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

// Update Student Details
export const updateStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { fatherName, motherName, tenthResult, twelfthResult, incomeCert } =
      req.body;

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (!existingStudent) {
      res.status(404).json({ error: "Student details not found" });
      return;
    }

    const updatedStudent = await prisma.studentDetails.update({
      where: { userId },
      data: {
        fatherName,
        motherName,
        tenthResult,
        twelfthResult,
        incomeCert,
      },
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

// Delete Student Details
export const deleteStudentDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (!existingStudent) {
      res.status(404).json({ error: "Student details not found" });
      return;
    }

    await prisma.studentDetails.delete({
      where: { userId },
    });

    res.status(200).json({ message: "Student details deleted successfully" });
  } catch (error) {
    console.error("Error deleting student details:", error);
    res.status(500).json({ error: "Failed to delete student details" });
  }
};
