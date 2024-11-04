import "reflect-metadata"
import server from "./server";
import { DB_PORT, PORT } from "./config/envs";
import { AppDataSource } from "./config/dataSource";

AppDataSource.initialize()
  .then (res => {
    console.log (`Database connected on port ${DB_PORT}`);
    server.listen(PORT, () => {
        console.log (`Server listening on port: ${PORT}`);
    });
  })
