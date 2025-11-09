import { Router } from "express";
import { createTask, getTask } from "../controller/task";
import { authenticateToken } from "../middleware/auth";
import { check } from "express-validator";
import checkValidation from "../middleware/validator";

const router = Router();

// Get all tasks
router.get("/", authenticateToken, getTask);

// Create a task
router.post(
  "/",
  [
    check("title", "Title is required").notEmpty(),
    check("due", "Due date is needed").notEmpty(),
  ],
  checkValidation,
  authenticateToken,
  createTask
);

export default router;
