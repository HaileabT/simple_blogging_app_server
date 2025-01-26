import { DataSource } from "typeorm";
import { User } from "./models/UserEntity";
import { Blog } from "./models/BlogEntity";
import { ENV } from "../shared/utils/env";

export const appDataSource = new DataSource({
  type: "postgres",
  host: ENV.dbHost,
  port: parseInt(ENV.dbPort ?? "5432"),
  username: ENV.dbUsername,
  password: ENV.dbPassword,
  database: ENV.dbDatabaseName,
  synchronize: true,
  logging: true,
  entities: [User, Blog],
  migrations: [],
});
