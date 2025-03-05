import { Router } from "express";
import registerUser from "../controllers/usercontroller.js";

const router = Router()

router.route("/register").post(registerUser)



export default router;