import { z } from "zod";

// Zod schema for student data validation
export const studentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  gender: z.enum(["Male", "Female", "Other"]),
  nationality: z.string().optional(),
  contactNumber: z.string().regex(/^\+91\d{10}$/, "Invalid Indian phone number"),
  address: z.string().min(5, "Address is too short"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  guardianName: z.string().optional(),
  guardianContact:  z.string().regex(/^\+91\d{10}$/, "Invalid Indian phone number"),
  aboutMe: z.string().optional(),
  tenthResult: z.string().optional(),
  twelfthResult: z.string().optional(),
  incomeCert: z.string().optional(),
  domicileCert: z.string().optional(),
  verified: z.boolean().default(false),
});

// Utility function to validate full data
export const validateStudentData = (data: any) => {
  return studentSchema.safeParse(data);
};

// Utility function to validate partial updates
export const validateStudentDataForUpdate = (data: any) => {
  return studentSchema.partial().safeParse(data);
};