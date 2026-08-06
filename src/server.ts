import express from "express";
import router from "./routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";
import { FRONTEND_URL } from "./config/envs";

const server = express();

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(
    cors({
        origin: FRONTEND_URL.split(",").map((origin) => origin.trim()),
    })
);
server.use(express.json());
server.use("/api", router);
server.get("/health", (req, res) => {
    res.status(200).send("OK");
});

export default server;
