import { Router } from "express";
import userRouter from "./users";
import taskRouter from "./task";

const router = Router();

router.use("/user", userRouter);

router.use("/task", taskRouter);

export default router;
