import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { AppError } from "../../shared/datastructures/AppError";
import { SignupRequest, UserByIdRequest } from "../types/user/UserRequest";
import { UserRepository } from "../../database/repositories/user.repository";
import { UserI } from "../../Entites/Iuser";
import { AuthPayload } from "../types/auth/AuthProviderPayload";

export const findUser = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const findUserById = (req: UserByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify user.");

  const blogId = req.params.id;

  APITerminal.respondWithSuccess(res, "hi", 200);
};

export const signup = async (req: SignupRequest, res: Response) => {
  const { name, password } = req.body;

  if (!name) throw new AppError(402, "Name is required to login.");
  if (!password) throw new AppError(402, "Password is required to login.");

  const userRepo = UserRepository.getRepository();

  const checkUser = await userRepo.findByName(name);

  if (checkUser)
    throw new AppError(
      400,
      "Another user has already registerd with that name."
    );

  const user = await userRepo.create(name, password);

  APITerminal.respondWithSuccess<AuthPayload>(
    res,
    {
      name: user.name,
      id: user.id,
    },
    200
  );
};
