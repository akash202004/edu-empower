import express from "express";
import { getAllUsers, registerOrUpdateUser, getUser} from "../controllers/userControllers"

const router = express.Router();

router.post("/registerorupdate", registerOrUpdateUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);

export default router;
