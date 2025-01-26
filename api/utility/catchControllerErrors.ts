import { Request, Response } from "express";
import { APITerminal } from "./APITerminal";

export const catchControllerError = (fn: Function) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      APITerminal.respondWithError(
        res,
        err.statusCode ? (err.statusCode < 500 ? "error" : "fail") : "fail",
        err,
        err.statusCode ?? 500
      );
    }
  };
};
