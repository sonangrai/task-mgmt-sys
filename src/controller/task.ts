import { Request, Response } from "express";
import { db } from "../db";
import { NewTask, task } from "../db/schema";
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

export const createTask = async (req: Request, res: Response) => {
  const payload: NewTask = {
    title: req.body.title,
    description: req.body.description || "",
    due: new Date(req.body.due),
    userId: req?.user?.id as string,
    status: req.body.status || undefined,
    priority: req.body.priority || undefined,
  };

  try {
    const response = await db.insert(task).values(payload).returning();

    const resObj = new ResponseObj(
      200,
      response,
      null,
      "Task created successfully"
    );
    return res.send(resObj);
  } catch (error) {
    return res.send(error);
  }
};
