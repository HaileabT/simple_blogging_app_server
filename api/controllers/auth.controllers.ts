import { Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { LoginRequest } from "../types/user/UserRequest";
import { AppError } from "../../shared/datastructures/AppError";
import { UserRepository } from "../../database/repositories/user.repository";
import { AuthServiceProvider } from "../../services/auth/auth.service";
import { LoginResponseData } from "../types/user/UserResponse";
import { HashingServiceProvider } from "../../services/hash/hash.service";

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

  APITerminal.respondWithSuccess<LoginResponseData>(
    res,
    {
      token: authData.token,
      user: {
        name: user.name,
        id: user.id,
      },
    },
    200
  );
};
