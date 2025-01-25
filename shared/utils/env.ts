import { configDotenv } from "dotenv";
configDotenv();
export const ENV = {
  port: process.env.PORT,
};
