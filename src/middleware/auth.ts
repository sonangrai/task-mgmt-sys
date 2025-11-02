import { NextFunction, Request, Response } from "express";
import supabase from "../db/supabase";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any; // You can type this more specifically based on Supabase's User type
    }
  }
}

/** Auth middleware that checks token from supabase email token */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Supabase auth error:", error);
      return res.status(403).json({ error: "Invalid token" });
    }

    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(500).json({ error: "Token verification failed" });
  }
};
