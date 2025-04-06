import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import axios from "axios";
import {
  validateStudentData,
  validateStudentDataForUpdate,
} from "../utils/studentDetailsValidation";
import { Role } from "@prisma/client";
import { isStudentDetailsComplete } from "../utils/studentDetailsCompleteness";

// Create student details
export const createStudentDetails = async (req: Request, res: Response) => {
  try {
    const validationResult = validateStudentData(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.format() });
      return;
    }

    const {
      userId,
      fullName,
      dateOfBirth,
      gender,
      nationality,
      contactNumber,
      address,
      fatherName,
      motherName,
      guardianName,
      guardianContact,
      tenthResult,
      twelfthResult,
      incomeCert,
      domicileCert,
      aboutMe,
    } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      res.status(403).json({ error: "User dosen't exists" });
      return;
    }

    if (existingUser.role !== Role.STUDENT) {
      res.status(403).json({ error: "Only students can create details" });
      return;
    }

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (existingStudent) {
      res.status(400).json({ error: "Student details already exist" });
      return;
    }

    if (isStudentDetailsComplete(validationResult.data)) {
      validationResult.data.verified = true;
    } else {
      validationResult.data.verified = false;
    }

    if (isStudentDetailsComplete(validationResult.data)) {
      validationResult.data.verified = true;
    } else {
      validationResult.data.verified = false;
    }

    const studentData = {
      userId,
      fullName,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      nationality: nationality ?? "",
      contactNumber,
      address,
      fatherName,
      motherName,
      guardianName: guardianName ?? "",
      guardianContact: guardianContact ?? "",
      aboutMe: aboutMe ?? "",
      tenthResult: tenthResult ?? "",
      twelfthResult: twelfthResult ?? "",
      incomeCert: incomeCert ?? "",
      domicileCert: domicileCert ?? "",
      verified: isStudentDetailsComplete(validationResult.data),
    };

    const student = await prisma.studentDetails.create({ data: studentData });
    try {
      console.log("📡 Sending trigger request...");
      await axios.post("http://localhost:5001/trigger-ai");
      console.log("✅ AI triggered successfully");
    } catch (aiError: any) {
      console.error("⚠️ Failed to trigger AI:", aiError.message);
    }

    res
      .status(201)
      .json({ message: "Student details created successfully", student });
  } catch (error) {
    console.error("Error creating student details:", error);
    res.status(500).json({ error: "Failed to create student details" });
    return;
  }
};

// update student details
export const updateStudentDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

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

    const validationResult = validateStudentDataForUpdate(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: validationResult.error.format() });
      return;
    }

    const updateData: Record<string, any> = {};

    Object.entries(validationResult.data).forEach(([key, value]) => {
      if (value !== undefined) updateData[key] = value;
    });

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "No valid fields provided for update" });
      return;
    }

    const combinedData = { ...existingStudent, ...updateData };
    updateData.verified = isStudentDetailsComplete(combinedData);

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
    return;
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

// Update Verified
export const updateStudentVerifiedStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const { verified } = req.body;

    if (!userId && !verified) {
      res.status(400).json({ error: "Missing fileds" });
    }

    if (typeof verified !== "boolean") {
      res.status(400).json({ error: "Verified status must be a boolean" });
      return;
    }

    const existingStudent = await prisma.studentDetails.findUnique({
      where: { userId },
    });

    if (!existingStudent) {
      res.status(404).json({ error: "Student details not found" });
      return;
    }

    const requestingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!requestingUser || requestingUser.role !== Role.ADMIN) {
      res.status(403).json({
        error: "Unauthorized: Only admins can update verification status",
      });
      return;
    }

    const updatedStudent = await prisma.studentDetails.update({
      where: { userId },
      data: { verified },
    });

    res.status(200).json({
      message: "Student verification status updated successfully",
      updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student verification status:", error);
    res.status(500).json({ error: "Failed to update verification status" });
  }
};
