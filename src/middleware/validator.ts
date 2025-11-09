import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * For checking if any error occurs in params
 * @param req
 * @param res
 * @param next
 * @returns
 */
const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).send(errors);
  }

  next();
};

export default checkValidation;
