import { api } from "./api/api";
import { initDatabase } from "./database/typeorm";
import { ENV } from "./shared/utils/env";

initDatabase();

api.listen(ENV.port, () => {
  console.log("Server is listening on port " + ENV.port);
});
