// routes/users.js
import express, { Request, Response } from "express";
import { authenticateToken } from "../middleware/auth";
import ResponseObj from "../controller/response";

const router = express.Router();

// Get current user profile
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const resp = new ResponseObj(
      200,
      req.user as Object,
      null,
      "User data fetched successfully"
    );
    return res.send(resp);
  } catch (error) {
    return res.send(error);
  }
});

export default router;
