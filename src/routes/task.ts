import { Router } from "express";
import { getTask } from "../controller/task";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Get all tasks
router.use("/", authenticateToken, getTask);

export default router;
