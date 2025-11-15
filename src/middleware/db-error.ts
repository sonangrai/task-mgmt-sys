import { NextFunction, Request, Response } from "express";

export interface DatabaseError extends Error {
  code?: string;
  severity?: string;
  detail?: string;
  table?: string;
  constraint?: string;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError | DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle AppError (custom errors)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
    return;
  }

  const dbError = err as DatabaseError;

  // PostgreSQL UUID format error (22P02)
  if (dbError.code === "22P02") {
    res.status(400).json({
      error: "Invalid data format",
      message:
        "One or more parameters have invalid format (check UUID/date formats)",
    });
    return;
  }

  // PostgreSQL data type errors (22xxx)
  if (dbError.code?.startsWith("22")) {
    res.status(400).json({
      error: "Invalid input data",
      message: dbError.message || "The provided data format is invalid",
    });
    return;
  }

  // Foreign key violation (23503)
  if (dbError.code === "23503") {
    res.status(400).json({
      error: "Reference error",
      message: "Cannot perform operation due to related records",
      detail: dbError.detail,
    });
    return;
  }

  // Unique constraint violation (23505)
  if (dbError.code === "23505") {
    res.status(409).json({
      error: "Duplicate entry",
      message: "A record with this information already exists",
      constraint: dbError.constraint,
    });
    return;
  }

  // Not null violation (23502)
  if (dbError.code === "23502") {
    res.status(400).json({
      error: "Missing required field",
      message: "Required field is missing",
      detail: dbError.detail,
    });
    return;
  }

  // Default error response
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong. Please try again later.",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      code: dbError.code,
    }),
  });
};

// 404 Not Found Handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
};
