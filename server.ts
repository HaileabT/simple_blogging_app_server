import { expressApp } from "./api/express";
import { ENV } from "./shared/utils/env";

expressApp.listen(ENV.port, () => {
  console.log("Server is listening on port " + ENV.port);
});
