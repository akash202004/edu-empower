import { z } from "zod";

// payment verification schema
export const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string().min(1, "razorpay_order_id is required"),
  razorpay_payment_id: z.string().min(1, "razorpay_payment_id is required"),
  razorpay_signature: z.string().min(1, "razorpay_signature is required"),
  donorId: z.string().uuid("Invalid donorId"),
  fundraiserId: z.string().uuid("Invalid fundraiserId"),
  amount: z.number().positive("Amount must be positive"),
});

// create order schema
export const createOrderSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
});
