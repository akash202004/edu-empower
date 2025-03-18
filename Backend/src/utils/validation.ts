import { z } from "zod";

// Zod schema for student data validation
export const studentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{2}$/, "Invalid date format (MM/DD/YY)"),
  gender: z.enum(["Male", "Female", "Other"]),
  nationality: z.string().optional(),
  contactNumber: z.string().regex(/^\+91 \d{10}$/, "Invalid Indian phone number"),
  address: z.string().min(5, "Address is too short"),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  scholarshipReason: z.string().optional(),
  careerGoals: z.string().optional(),
  otherScholarships: z.boolean(),
  tenthResult: z.string().optional(),
  twelfthResult: z.string().optional(),
  incomeCert: z.string().optional(),
  verified: z.boolean().default(false),
});

// Utility function to validate data
export const validateStudentData = (data: any) => {
  return studentSchema.safeParse(data);
};

export const validateStudentDataForUpdate = (data: any) => {
  return studentSchema.partial().safeParse(data);
};