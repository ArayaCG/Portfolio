import { Router } from "express";
import { getVisitCounter, logVisit, getVisitLogs, getMonthlyVisits } from "../controllers/visitor.controller";
import { verifyToken } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: Gestión de visitas al portfolio
 */
const visitorRoute = Router();

/**
 * @swagger
 * /api/visits/count:
 *   get:
 *     summary: Obtener el contador de visitas
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: Total de visitas obtenidas
 */
visitorRoute.get("/count", getVisitCounter);

/**
 * @swagger
 * /api/visits/log:
 *   post:
 *     summary: Registrar una visita
 *     tags: [Visits]
 *     responses:
 *       201:
 *         description: Visita registrada correctamente
 */
visitorRoute.post("/log", logVisit);

/**
 * @swagger
 * /api/visits/logs:
 *   get:
 *     summary: Obtener logs de visitas (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: Lista de logs obtenida correctamente
 *       401:
 *         description: No autorizado
 */
visitorRoute.get("/logs", verifyToken, getVisitLogs);

/**
 * @swagger
 * /api/visits/monthly:
 *   get:
 *     summary: Obtener el conteo de visitas por mes (últimos 12 meses, Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: Objeto con la cantidad de visitas por mes (formato YYYY-MM)
 *       401:
 *         description: No autorizado
 */
visitorRoute.get("/monthly", verifyToken, getMonthlyVisits);

export default visitorRoute;
