import { configDotenv } from "dotenv";
configDotenv();
export const ENV = {
  port: process.env.PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbDatabaseName: process.env.DB_DATABASE_NAME,
  dbHost: process.env.DB_HOST,
};
