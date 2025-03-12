import { Router } from "express";
import { 
  createStudentDetails, 
  getStudentDetails, 
  updateStudentDetails, 
  deleteStudentDetails 
} from "../controllers/studentController";

const router = Router();

router.post("/", createStudentDetails); 
router.get("/:userId", getStudentDetails); 
router.put("/:userId", updateStudentDetails); 
router.delete("/:userId", deleteStudentDetails); 

export default router;
