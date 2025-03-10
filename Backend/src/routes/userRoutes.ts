import express from "express";
import {
  registerOrUpdateUser,
  getUser,
  getAllUsers,
} from "../controllers/userControllers";
import { validateUser } from "../middlewares/validateUser";

const router = express.Router();

router.post("/registerorupdate", validateUser, registerOrUpdateUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

export default router;
