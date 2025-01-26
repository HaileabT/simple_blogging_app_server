import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { AppError } from "../utility/AppError";
import { UserByIdRequest } from "../types/UserRequest";

export const findUser = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const findUserById = (req: UserByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify user.");

  const blogId = req.params.id;

  APITerminal.respondWithSuccess(res, "hi", 200);
};

export const signup = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess(res, "hi", 200);
};
