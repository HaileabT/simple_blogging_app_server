import { NextFunction, Request, Response } from "express";
import { AuthenticUserAttachedRequest, RequestCookie } from "../types/app/RequestCookie";
import { AppError } from "../../shared/datastructures/AppError";
import { AuthServiceProvider } from "../../services/auth/auth.service";
import { UserRepository } from "../../database/repositories/user.repository";

export class AuthMiddleware {
  static authMiddleware: AuthMiddleware | null = null;

  private constructor() {}

  static getMiddleware() {
    if (!AuthMiddleware.authMiddleware) {
      AuthMiddleware.authMiddleware = new AuthMiddleware();
    }

    return AuthMiddleware.authMiddleware;
  }

  async protectFromUnknownUser(req: RequestCookie & AuthenticUserAttachedRequest, res: Response, next: NextFunction) {
    if (!req.cookies["auth-token"].trim()) throw new AppError(400, "User unauthorized.");
    const authToken = req.cookies["auth-token"];

    const id = AuthServiceProvider.getProvider().authenticate(authToken);

    if (!id.trim()) throw new AppError(402, "Invalid Session");

    if (req.params.id) {
      if (id.trim() !== req.params.id.trim()) throw new AppError(402, "User unauthorized.");
    }

    const userRepo = UserRepository.getRepository();

    const user = await userRepo.findById(id);

    if (!user) throw new AppError(402, "User not known.");

    req.user = user;

    console.log(next);

    next();
    return;
  }
}
