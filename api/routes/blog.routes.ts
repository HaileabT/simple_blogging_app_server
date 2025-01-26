import { Router } from "express";
import { catchControllerError } from "../utility/catchControllerErrors";
import {
  createBlog,
  findBlog,
  findBlogById,
  deleteBlog,
  searchBlog,
} from "../controllers/blog.controllers";
import { apiRouter } from "./index.routes";

const blogRouter = Router();

blogRouter
  .route("/")
  .get(catchControllerError(findBlog))
  .post(catchControllerError(createBlog));
blogRouter
  .route("/:id")
  .get(catchControllerError(findBlogById))
  .delete(deleteBlog);
export { blogRouter };
