import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import crypto from "crypto";
import { razorpay } from "../config/razorpayConfig";
import {
  createOrderSchema,
  paymentVerificationSchema,
} from "../utils/paymentDetailsValidation";

export const createOrder = async (req: Request, res: Response) => {
  const parseResult = createOrderSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.flatten() });
    return;
  }

  const { amount } = parseResult.data;

  if (!amount) {
    res.status(400).json({ message: "Amount is required" });
    return;
  }
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const parseResult = paymentVerificationSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.flatten() });
    return;
  }
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    donorId,
    fundraiserId,
    amount,
  } = parseResult.data;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    res.status(400).json({ success: false, message: "Invalid signature" });
    return;
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
        amount,
        donorId,
        fundraiserId,
        status: "SUCCESS",
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Payment verified", payment });
  } catch (error) {
    console.error("Payment verification failed.");
    res.status(400).json({ success: false, message: "Invalid signature" });
    return;
  }
};
