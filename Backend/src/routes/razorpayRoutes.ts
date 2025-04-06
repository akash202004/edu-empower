import express from "express";
import { createOrder, verifyPayment } from "../controllers/razorpayController";

const router = express.Router();

router.post("/createorder", createOrder);
router.post("/verifypayment", verifyPayment);

export default router;
