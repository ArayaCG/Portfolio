import redis from "../config/redisClient";

const VISITOR_KEY = "portfolio:visits";
const VISITOR_LOGS_KEY = "portfolio:visit_logs";
const VISITOR_LOGS_MAX = 500;
const MONTHLY_KEY_PREFIX = "portfolio:visits:monthly:";

function monthKey(date: Date): string {
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${MONTHLY_KEY_PREFIX}${date.getUTCFullYear()}-${month}`;
}

export class VisitorService {
    private redis: typeof redis;

    constructor(redisClient: typeof redis) {
        this.redis = redisClient;
    }

    async logVisit(): Promise<{ message: string; visits: number }> {
        try {
            const visitData = { timestamp: new Date().toISOString() };

            const visits = await this.redis.incr(VISITOR_KEY);
            await this.redis.incr(monthKey(new Date()));
            await this.redis.lpush(VISITOR_LOGS_KEY, JSON.stringify(visitData));
            await this.redis.ltrim(VISITOR_LOGS_KEY, 0, VISITOR_LOGS_MAX - 1);

            return {
                message: "✅ Visita registrada en logs",
                visits,
            };
        } catch (error) {
            console.error("Error al registrar visita", error);
            throw new Error("Error al registrar visita");
        }
    }

    async getVisitLogs(): Promise<any[]> {
        try {
            const logs = await this.redis.lrange(VISITOR_LOGS_KEY, 0, -1);
            return logs.map((log) => JSON.parse(log));
        } catch (error) {
            console.error("Error obteniendo logs", error);
            throw new Error("Error al obtener logs");
        }
    }

    async getVisitCounter(): Promise<{ visits: number }> {
        try {
            const counter = await this.redis.get(VISITOR_KEY);
            return { visits: counter ? parseInt(counter) : 0 };
        } catch (error) {
            console.error("Error obteniendo contador", error);
            throw new Error("Error al obtener contador");
        }
    }

    async getMonthlyVisits(months = 12): Promise<Record<string, number>> {
        try {
            const now = new Date();
            const result: Record<string, number> = {};

            for (let i = 0; i < months; i++) {
                const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
                const label = monthKey(date).replace(MONTHLY_KEY_PREFIX, "");
                const count = await this.redis.get(monthKey(date));
                result[label] = count ? parseInt(count) : 0;
            }

            return result;
        } catch (error) {
            console.error("Error obteniendo visitas mensuales", error);
            throw new Error("Error al obtener visitas mensuales");
        }
    }
}

export const visitorService = new VisitorService(redis);
