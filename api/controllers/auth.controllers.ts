import { Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { LoginRequest } from "../types/user/UserRequest";
import { AppError } from "../../shared/datastructures/AppError";
import { UserRepository } from "../../database/repositories/user.repository";
import { AuthServiceProvider } from "../../services/auth/auth.service";
import { HashingServiceProvider } from "../../services/hash/hash.service";
import { AuthPayload } from "../types/auth/AuthProviderPayload";
import { AuthenticUserAttachedRequest, RequestCookie } from "../types/app/RequestCookie";

export const login = async (req: LoginRequest, res: Response) => {
  const { name, password } = req.body;

  if (!name) throw new AppError(402, "Email is required to login.");
  if (!password) throw new AppError(402, "Password is required to login.");

  const userRepo = UserRepository.getRepository();

  const user = await userRepo.findByName(name);

  if (!user) throw new AppError(402, "Name or password invalid.");

  const isPasswordCorrect = await HashingServiceProvider.getProvider().verify(password, user.password);

  if (!isPasswordCorrect) throw new AppError(402, "Name or password invalid.");

  const authData = AuthServiceProvider.getProvider().signAuthentication(user.id);

  res.cookie("auth-token", authData.token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600 * 1000 * 24 * 30, // a month
  });

  APITerminal.respondWithSuccess<AuthPayload>(
    res,
    {
      name: user.name,
      id: user.id,
    },
    200
  );
};

export const logout = async (req: AuthenticUserAttachedRequest, res: Response) => {
  if (!req.user) throw new AppError(402, "User not recognized.");

  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: false,
  });

  APITerminal.respondWithSuccess<{ loggedout: boolean }>(
    res,
    {
      loggedout: true,
    },
    200
  );
};
