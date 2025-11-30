FROM node:20-alpine

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm install

# prisma schema + generate
COPY prisma ./prisma
RUN npx prisma generate

# исходники
COPY . .

# билд nest
RUN npm run build

EXPOSE 3000

# миграции при старте + prod запуск
CMD npx prisma migrate deploy && npm run start:prod
