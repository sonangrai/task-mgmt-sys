import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("app running", PORT);
});
