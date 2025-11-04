// routes/users.js
import express, { Request, Response } from "express";
import { authenticateToken } from "../middleware/auth";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

// Get current user profile
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    res.send(req.user);
  } catch (error) {
    return res.send(error);
  }
});

// Sync user on first login (called from frontend after auth)
// router.post("/sync", authenticateToken, async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     // Check if user already exists
//     const existingUser = await db
//       .select()
//       .from(users)
//       .where(eq(users.supabaseUid, req?.user?.id));

//     if (existingUser.length > 0) {
//       return res.json(existingUser[0]);
//     }

//     // Create new user in your database
//     const [newUser] = await db
//       .insert(users)
//       .values({
//         supabaseUid: req?.user?.id,
//         email: email,
//       })
//       .returning();

//     res.json(newUser);
//   } catch (error) {
//     return res.send(error);
//   }
// });

export default router;
