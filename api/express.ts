import express, { Express, json } from "express";
import { apiRouter } from "./routes/index.routes";
import cors from "cors";
const app: Express = express();

// Middlewares
app.use(cors());
app.use(json());

// API Router
app.use("/api/v1", apiRouter);

export { app as expressApp };
