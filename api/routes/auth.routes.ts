import { Router } from "express";
import { login, logout } from "../controllers/auth.controllers";
import { catchControllerError } from "../utility/catchControllerErrors";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
const authRouter = Router();
const authMiddleware = AuthMiddleware.getMiddleware();

authRouter.route("/login").post(catchControllerError(login));
authRouter
  .route("/logout")
  .get(catchControllerError(authMiddleware.protectFromUnknownUser), catchControllerError(logout));

export { authRouter };
