import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "../controllers/auth.controller";

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Demasiados intentos de inicio de sesión. Intentá de nuevo más tarde." },
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */
const authRouter = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Nombre de usuario o correo electrónico
 *                 example: "usuario123"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (mínimo 8 caracteres)"
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Token generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales incorrectas
 */
authRouter.post("/login", loginLimiter, (req, res) => authController.login(req, res));

export default authRouter;
