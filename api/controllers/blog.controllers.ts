import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { BlogByIdRequest } from "../types/blog/BlogRequest";
import { AppError } from "../../shared/datastructures/AppError";

export const findBlog = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const findBlogById = (req: BlogByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify blog.");

  const blogId = req.params.id;

  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const createBlog = (req: Request, res: Response) => {
  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const deleteBlog = (req: BlogByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify blog.");

  const blogId = req.params.id;

  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};
