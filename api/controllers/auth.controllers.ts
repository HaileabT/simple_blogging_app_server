import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";

export const login = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess(res, "hi", 200);
};
