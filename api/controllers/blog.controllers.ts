import { Request, Response } from "express";
import { APITerminal } from "../utility/APITerminal";
import { BlogByIdRequest, CreateBlogRequest } from "../types/blog/BlogRequest";
import { AppError } from "../../shared/datastructures/AppError";
import { blogRepository } from "../../database/repositories/blog.repository";
import { BlogI } from "../../Entites/Iblog";
import { SearchRepository } from "../../database/repositories/search.repository";
import { AuthenticUserAttachedRequest } from "../types/app/RequestCookie";
import { UserRepository } from "../../database/repositories/user.repository";
import { UserI } from "../../Entites/Iuser";

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

export const createBlog = async (req: CreateBlogRequest & AuthenticUserAttachedRequest, res: Response) => {
  if (!req.user) throw new AppError(402, "User not recognized.");

  const { title, body } = req.body;
  const { user } = req;

  const blogRepo = blogRepository.getRepository();

  if (!title) throw new AppError(400, "please insert the title");
  if (!body) throw new AppError(400, "please insert body");

  const response = await blogRepo.create(title, body, user);

  APITerminal.respondWithSuccess<BlogI>(res, response, 201);
};

export const deleteBlog = (req: BlogByIdRequest, res: Response) => {
  if (!req.params.id) throw new AppError(402, "Could not identify blog.");
  const blogId = req.params.id;

  const blogRepo = blogRepository.getRepository();

  const deleteBlog = blogRepo.delete(blogId);

  APITerminal.respondWithSuccess<string>(res, "blog deleted", 200);
};

export const searchBlog = async (req: Request, res: Response) => {
  const { title } = req.body;
  const searchRepo = SearchRepository.getRepository();
  const response = await searchRepo.searchByTitle(title);

  APITerminal.respondWithSuccess<BlogI[]>(res, response, 200);
};

export const searchBlogByOwn = async (req: AuthenticUserAttachedRequest, res: Response) => {
  const { user } = req;
  console.log(user);
  if (!user) throw new AppError(402, "User not recognized.");
  const searchRepo = SearchRepository.getRepository();
  const response = await searchRepo.searchByUser(user);
  console.log(response);
  APITerminal.respondWithSuccess<BlogI[]>(res, response, 200);
};
