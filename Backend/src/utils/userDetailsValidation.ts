import { Role } from "@prisma/client";
import { z } from "zod";

const userSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.nativeEnum(Role, { errorMap: () => ({ message: "Invalid role" }) }),
});

// Utility function to validate full user data (for internal use)
export const validateUserDataAndUpdate = (data:any) => {
  return userSchema.partial().safeParse(data);
};
