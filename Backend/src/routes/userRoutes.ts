import express from "express";
import {
  registerOrUpdateUser,
  getUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userControllers";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.post("/registerorupdate", validateUser, registerOrUpdateUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
