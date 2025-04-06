import { Request, Response } from "express";
import crypto from "crypto";
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

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    console.log("Payment verified!");
    res.status(200).json({ success: true, message: "Payment verified" });
    return;
  } else {
    console.error("Payment verification failed.");
    res.status(400).json({ success: false, message: "Invalid signature" });
    return;
  }
};
