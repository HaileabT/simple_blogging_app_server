import { Router } from "express";
import { findUser, findUserById, signup } from "../controllers/user.controllers";
import { catchControllerError } from "../utility/catchControllerErrors";

const userRouter = Router();

userRouter.route("/signup").post(catchControllerError(signup));
userRouter.route("/").get(catchControllerError(findUser));
userRouter.route("/:id").get(catchControllerError(findUserById));

export { userRouter };
