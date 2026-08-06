import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./envs";

const SECRET_KEY = JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

export const generateAdminToken = () => {
    return jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
};
