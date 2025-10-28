FROM node:22-alpine

WORKDIR /app

# evitar instalar opcionales que rompan en alpine
ENV NODE_ENV=development
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# Copiar package files primero para cache de layer
COPY package*.json ./

# Instala dependencias (dev incluidas para vite)
RUN npm install

# Copia el resto del código
COPY . .

EXPOSE 5173 5174

# Por defecto arranca el dev server; docker-compose puede sobrescribir el comando
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]