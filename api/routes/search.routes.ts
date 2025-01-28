import { Router } from "express";
import { searchBlog, searchBlogByOwn } from "../controllers/blog.controllers";
import { catchControllerError } from "../utility/catchControllerErrors";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const searchRouter = Router();

searchRouter
  .route("/own")
  .get(
    catchControllerError(AuthMiddleware.getMiddleware().protectFromUnknownUser),
    catchControllerError(searchBlogByOwn)
  );
searchRouter.route("/").get(catchControllerError(searchBlog));

export { searchRouter };
