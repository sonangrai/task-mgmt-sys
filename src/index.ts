import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Routes
app.use("/api/", router);

app.listen(PORT, () => {
  console.log("app running on PORT -> ", PORT);
});
