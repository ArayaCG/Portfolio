import { DataSource } from "typeorm";
import { BASE_DATOS, PASSWORD_POSTGRE } from "./envs";
import { Project } from "../entities/Project";
import { ContactMessage } from "../entities/ContactMessage";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: PASSWORD_POSTGRE,
    database: BASE_DATOS,
    synchronize: true,
    logging: false,
    entities: [Project, ContactMessage],
    subscribers: [],
    migrations: [],
});
