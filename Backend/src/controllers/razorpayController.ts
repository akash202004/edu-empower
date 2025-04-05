import { Request, Response } from "express";
import { razorpay } from "../config/razorpayConfig";

export const createOrder = async (req: Request, res: Response) => {
  const { amount } = req.body;
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
