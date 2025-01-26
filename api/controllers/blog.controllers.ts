import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { BlogByIdRequest } from "../types/BlogRequest";
import { AppError } from "../utility/AppError";
import { Blog } from "../../database/models/BlogEntity";
import { appDataSource } from "../../database/datasource";
import { BlogI } from "../../Entites/Iblog";

const blogRepository = appDataSource.getRepository(Blog);

export const findBlog = async (req: Request, res: Response) => {
  const Blog = await blogRepository.find({
    relations: ["User"],
  });
  APITerminal.respondWithSuccess<BlogI[]>(res, Blog, 200);
};

export const findBlogById = async (req: BlogByIdRequest, res: Response) => {
  const blogId = req.params.id;
  if (!blogId) throw new AppError(402, "Could not identify blog.");
  const getBlog = await blogRepository.findOne({ where: { id: blogId } });
  if (!getBlog) throw new AppError(402, "could not get blog.");
  APITerminal.respondWithSuccess<BlogI>(res, getBlog, 200);
};

export const createBlog = async (req: Request, res: Response) => {
  const reqBody = req.body;
  const newBlog = await blogRepository.save(reqBody);
  APITerminal.respondWithSuccess<BlogI>(res, newBlog, 200);
};

export const deleteBlog = (req: BlogByIdRequest, res: Response) => {
  const blogId = req.params.id;
  if (!blogId) throw new AppError(402, "Could not identify blog.");
  blogRepository.delete(blogId);

  APITerminal.respondWithSuccess<string>(res, "blog deleted", 200);
};
