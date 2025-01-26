import { appDataSource } from "./datasource";

const initDatabase = () => {
  appDataSource
    .initialize()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((reason) => {
      console.log(reason);
    });
};

export { initDatabase };
