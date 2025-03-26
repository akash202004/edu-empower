import { z } from "zod";

// Zod schema for organization details validation
export const organizationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  organizationName: z.string().min(3, "Organization name must be at least 3 characters"),
  registrationNumber: z.string().min(3, "Registration number must be at least 3 characters"),
  contactPerson: z.string().min(3, "Contact person name must be at least 3 characters"),
  contactEmail: z.string().email("Invalid email address"),
  contactNumber: z.string().regex(/^\+91\d{10}$/, "Invalid Indian phone number"),
  address: z.string().min(5, "Address is too short"),
  websiteURL: z.string().url("Invalid URL").optional(),
  documentURL: z.string().min(5, "Document URL is required"),
  verified: z.boolean().default(false),
  verifiedAt: z.string().optional(),
});

// Utility function to validate full organization data
export const validateOrganizationData = (data: any) => {
  return organizationSchema.safeParse(data);
};

// Utility function to validate partial updates
export const validateOrganizationDataForUpdate = (data: any) => {
  return organizationSchema.partial().safeParse(data);
};
