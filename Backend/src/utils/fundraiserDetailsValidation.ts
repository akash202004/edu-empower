import { string, z } from "zod";

const createFundraiserDetailsSchema = z.object({
  title: string().min(1, "Title is required"),
  description: string().min(10, "Description is required"),
  goalAmount: z.number().min(1, "Goal amount must be greater than 0"),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  organizationId: string().min(1, "Organization ID is required"),
});

const updateFundraiserDetailsSchema = createFundraiserDetailsSchema.partial();

export const validateCreateFundraiserDetails = (data: any) => {
  return createFundraiserDetailsSchema.safeParse(data);
};

export const validateUpdateFundraiserDetails = (data: any) => {
  return updateFundraiserDetailsSchema.safeParse(data);
};
