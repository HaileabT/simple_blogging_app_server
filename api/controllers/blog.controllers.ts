import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { BlogByIdRequest } from "../types/blog/BlogRequest";
import { AppError } from "../../shared/datastructures/AppError";
import { blogRepository } from "../../database/repositories/blog.repository";
import { BlogI } from "../../Entites/Iblog";

export const findBlog = async (req: Request, res: Response) => {
  const blogRepo = blogRepository.getRepository();
  const blogs = await blogRepo.find();

  APITerminal.respondWithSuccess<BlogI[]>(res, blogs, 200);
};

export const findBlogById = (req: BlogByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify blog.");

  const blogId = req.params.id;

  APITerminal.respondWithSuccess<string>(res, "hello", 200);
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, body } = req.body;

  const blogRepo = blogRepository.getRepository();

  if (!title) throw new AppError(400, "please insert the title");
  if (!body) throw new AppError(400, "please insert body");

  const response = await blogRepo.create(title, body);

  APITerminal.respondWithSuccess<BlogI>(res, response, 201);
};

export const deleteBlog = (req: BlogByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify blog.");
  const blogId = req.params.id;

  const blogRepo = blogRepository.getRepository();

  const deleteBlog = blogRepo.delete(blogId);

  APITerminal.respondWithSuccess<string>(res, "blog deleted", 200);
};
