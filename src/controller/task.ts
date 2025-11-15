import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { NewTask, task } from "../db/schema";
import ResponseObj from "./response";
import { validate as isValidUUID } from "uuid";
import { eq } from "drizzle-orm";
import { AppError } from "../middleware/db-error";

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

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!isValidUUID(req.params.id)) {
      throw new AppError(400, "Invalid task ID format. Expected valid UUID.");
    }

    const result = await db
      .delete(task)
      .where(eq(task.id, req.params.id))
      .returning();

    if (result.length == 0)
      throw new ResponseObj(404, {}, null, "Failed to delete");

    const resObj = new ResponseObj(
      200,
      null,
      null,
      "Task deleted successfully"
    );

    return res.status(200).send(resObj);
  } catch (error: any) {
    next(error);
  }
};
