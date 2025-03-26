import express from "express";
import { getStudentRank } from "../controllers/studentRankRoutes";

const router = express.Router();

router.get("/", getStudentRank);

export default router;