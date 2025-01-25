import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get().post();

export { userRouter };
