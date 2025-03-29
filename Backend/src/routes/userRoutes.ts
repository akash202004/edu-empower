import express from "express";
import {
  registerOrUpdateUser,
  getUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userControllers";
const router = express.Router();

router.post("/registerorupdate", registerOrUpdateUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
