import { Request, Response } from "express";
import { db } from "../db";
import { task } from "../db/schema";
import ResponseObj from "./response";

export const getTask = async (req: Request, res: Response) => {
  try {
    const response = await db.select().from(task);

    const responseObj = new ResponseObj(200, response, null, "Task fetched");
    return res.send(responseObj);
  } catch (error) {
    return res.send(error);
  }
};
