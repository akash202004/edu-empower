import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import {
  validateStudentData,
  validateStudentDataForUpdate,
} from "../utils/studentDetailsValidation";
import fs from "fs";
import path from "path";
import { Role } from "@prisma/client";

const normalizePath = (path: string) => path.replace(/\\/g, "/");

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

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

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
      tenthResult: files?.["tenthResult"]?.[0]?.path
        ? normalizePath(files["tenthResult"][0].path)
        : "",
      twelfthResult: files?.["twelfthResult"]?.[0]?.path
        ? normalizePath(files["twelfthResult"][0].path)
        : "",
      incomeCert: files?.["incomeCert"]?.[0]?.path
        ? normalizePath(files["incomeCert"][0].path)
        : "",
      domicileCert: files?.["domicileCert"]?.[0]?.path
        ? normalizePath(files["domicileCert"][0].path)
        : "",
      verified: true,
    };

    const student = await prisma.studentDetails.create({ data: studentData });

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

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (files?.["tenthResult"]?.[0]) {
      updateData.tenthResult = normalizePath(files["tenthResult"][0].path);
    }
    if (files?.["twelfthResult"]?.[0]) {
      updateData.twelfthResult = normalizePath(files["twelfthResult"][0].path);
    }
    if (files?.["incomeCert"]?.[0]) {
      updateData.incomeCert = normalizePath(files["incomeCert"][0].path);
    }
    if (files?.["domicileCert"]?.[0]) {
      updateData.domicileCert = normalizePath(files["domicileCert"][0].path);
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "No valid fields provided for update" });
      return;
    }

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

    if (existingStudent.tenthResult) {
      fs.unlinkSync(path.join(__dirname, "..", existingStudent.tenthResult));
    }
    if (existingStudent.twelfthResult) {
      fs.unlinkSync(path.join(__dirname, "..", existingStudent.twelfthResult));
    }
    if (existingStudent.incomeCert) {
      fs.unlinkSync(path.join(__dirname, "..", existingStudent.incomeCert));
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
