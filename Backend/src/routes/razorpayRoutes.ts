import express from "express";
import { createOrder } from "../controllers/razorpayController";

const router = express.Router();

router.post("/createorder", createOrder);
router.post("/verifyorder");
