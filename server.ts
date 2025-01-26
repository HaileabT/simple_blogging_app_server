import { expressApp } from "./api/express";
import { initDatabase } from "./database/typeorm";
import { ENV } from "./shared/utils/env";

initDatabase();

expressApp.listen(ENV.port, () => {
  console.log("Server is listening on port " + ENV.port);
});
