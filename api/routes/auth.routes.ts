import { Router } from "express";
import { login } from "../controllers/auth.controllers";
import { catchControllerError } from "../utility/catchControllerErrors";
const authRouter = Router();

authRouter.route("/login").post(catchControllerError(login));

export { authRouter };
