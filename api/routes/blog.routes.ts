import { Router } from "express";
import { catchControllerError } from "../utility/catchControllerErrors";
import { createBlog, findBlog, findBlogById, deleteBlog } from "../controllers/blog.controllers";

const blogRouter = Router();

blogRouter.route("/").get(catchControllerError(findBlog)).post(createBlog);
blogRouter.route("/:id").get(catchControllerError(findBlogById)).delete(deleteBlog);

export { blogRouter };
