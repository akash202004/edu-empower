import express from "express";
import {
  getAllRankings,
  getRankingById,
  createRanking,
  updateRanking,
  deleteRanking,
  getRankingsByScholarshipId,
} from "../controllers/studentRankingController"

const router = express.Router();

router.get("/", getAllRankings);
router.get("/:id", getRankingById);
router.post("/", createRanking);
router.put("/:id", updateRanking);
router.delete("/:id", deleteRanking);
router.get("/scholarship/:scholarshipId", getRankingsByScholarshipId);

export default router;
