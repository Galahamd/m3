import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from "./envs";
import Credential from "../entities/Credendials";
import User from "../entities/User";
import Appointment from "../entities/Appointments";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [Credential, User, Appointment],
    subscribers: [],
    migrations: [],
});

export const credentialModel = AppDataSource.getRepository (Credential);
export const userModel = AppDataSource.getRepository (User);
export const appointmentModel = AppDataSource.getRepository (Appointment);