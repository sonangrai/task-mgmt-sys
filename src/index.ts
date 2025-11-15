import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/db-error";

dotenv.config();

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Routes
app.use("/api/", router);

// 404 Handler (must be after all routes)
app.use(notFoundHandler);

// Global Error Handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("app running on PORT -> ", PORT);
});
