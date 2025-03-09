import express, { Express, json } from "express";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/index.routes";
import cors from "cors";
const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: [process.env.LOCAL_FRONTEND_SERVER"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());
app.use(json());

// API Router
app.use("/api/v1", apiRouter);

export { app as api };
