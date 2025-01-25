import { Router } from "express";
import { userRouter } from "./user.routes";
const apiRouter = Router();

apiRouter.use("/users", userRouter);

export { apiRouter };
