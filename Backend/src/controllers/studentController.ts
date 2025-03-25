import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import { validateStudentData, validateStudentDataForUpdate } from "../utils/validation";
import fs from "fs";
import path from "path";

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
      careerGoals,
      otherScholarships,
    } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
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
      const domicileCert = files?.["domicileCert"]?.[0]?.path
      ? normalizePath(files["domicileCert"][0].path)
      : ""

    const studentData = {
      userId,
      fullName,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      nationality: nationality ?? "",
      contactNumber,
      address,
      fatherName: fatherName ?? "",
      motherName: motherName ?? "",
      careerGoals: careerGoals ?? "",
      otherScholarships,
      tenthResult,
      twelfthResult,
      incomeCert,
      domicileCert,
      verified: true,
    };

    const student = await prisma.studentDetails.create({
      data: studentData,
    });

    res
      .status(201)
      .json({ message: "Student details created successfully", student });
  } catch (error) {
    console.error("Error creating student details:", error);
    res.status(500).json({ error: "Failed to create student details" });
    return;
  }
};

// update students details
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

    const {
      fullName,
      dateOfBirth,
      gender,
      nationality,
      contactNumber,
      address,
      fatherName,
      motherName,
      careerGoals,
      otherScholarships,
      verified,
    } = validationResult.data;

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const updateData: Record<string, any> = {};

    if (fullName !== undefined) updateData.fullName = fullName;
    if (dateOfBirth !== undefined)
      updateData.dateOfBirth = new Date(dateOfBirth);
    if (gender !== undefined) updateData.gender = gender;
    if (nationality !== undefined) updateData.nationality = nationality;
    if (contactNumber !== undefined) updateData.contactNumber = contactNumber;
    if (address !== undefined) updateData.address = address;
    if (fatherName !== undefined) updateData.fatherName = fatherName;
    if (motherName !== undefined) updateData.motherName = motherName;
    if (careerGoals !== undefined) updateData.careerGoals = careerGoals;
    if (otherScholarships !== undefined)
      updateData.otherScholarships = otherScholarships;
    if (verified !== undefined) updateData.verified = verified;

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
