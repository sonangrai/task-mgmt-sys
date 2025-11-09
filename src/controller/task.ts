import { Request, Response } from "express";
import { db } from "../db";
import { task } from "../db/schema";
import ResponseObj from "./response";
import { eq } from "drizzle-orm";

export const getTask = async (req: Request, res: Response) => {
  try {
    const response = await db
      .select()
      .from(task)
      .where(eq(task.userId, req?.user?.id as string));

    const responseObj = new ResponseObj(
      200,
      response,
      null,
      response.length > 0 ? "Task fetched" : "No Task for this user"
    );
    return res.send(responseObj);
  } catch (error) {
    return res.send(error);
  }
};
