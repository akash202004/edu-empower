import { z } from "zod";

const scholarshipSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  totalAmount: z.number().min(0, "Total amount must be a positive number"),
  allocatedAmount: z.number().min(0, "Allocated amount must be a positive number").default(0),
  fundraiserId: z.string().uuid().nullable().optional(),
  organizationId: z.string(),
  maxFamilyIncome: z.number().min(0, "Max family income must be a positive number"),
  expiredAt: z.coerce.date(), 
  createdAt: z.coerce.date().default(new Date()), 
});

// Utility function to validate full scholarship data (for internal use)
export const validateScholarshipData = (data: any) => {
  return scholarshipSchema.safeParse(data);
};

// Utility function for updating a scholarship (partial updates allowed)
export const validateScholarshipUpdate = (data: any) => {
  return scholarshipSchema.partial().safeParse(data);
};
