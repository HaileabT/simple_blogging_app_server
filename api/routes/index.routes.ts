import { Router } from "express";
import { userRouter } from "./user.routes";
import { authRouter } from "./auth.routes";
import { blogRouter } from "./blog.routes";
import { searchRouter } from "./search.routes";
const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/blog", blogRouter);
apiRouter.use("/search", searchRouter);

export { apiRouter };
