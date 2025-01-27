import { Router } from "express";
import { searchBlog } from "../controllers/blog.controllers";
import { catchControllerError } from "../utility/catchControllerErrors";

const searchRouter = Router();

searchRouter.route("/").get(catchControllerError(searchBlog));

export { searchRouter };
