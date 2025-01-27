import { Router } from "express";
import { catchControllerError } from "../utility/catchControllerErrors";
import { createBlog, findBlog, findBlogById, deleteBlog, searchBlog } from "../controllers/blog.controllers";
import { apiRouter } from "./index.routes";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const blogRouter = Router();
const authMiddleware = AuthMiddleware.getMiddleware();

blogRouter
  .route("/")
  .get(catchControllerError(findBlog))
  .post(catchControllerError(authMiddleware.protectFromUnknownUser), catchControllerError(createBlog));
blogRouter
  .route("/:id")
  .get(catchControllerError(findBlogById))
  .delete(catchControllerError(authMiddleware.protectFromUnknownUser), catchControllerError(deleteBlog));
export { blogRouter };
