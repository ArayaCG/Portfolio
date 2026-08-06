FROM node:22-slim AS builder

WORKDIR /app

# Copia solo los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./
RUN npm ci

# Copia el resto de los archivos
COPY . .

# Compilar TypeScript
RUN npx tsc

# Etapa de producción
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

RUN mkdir -p dist/uploads && chown -R node:node /app

USER node

ENV NODE_ENV=production

EXPOSE 3000

# Agrega healthcheck (sin depender de curl, que no viene instalado en node:*-slim)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/index.js"]