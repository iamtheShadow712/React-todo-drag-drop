ARG TAG=18-alpine
FROM node:${TAG} AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ----- Final Stage ----- #

FROM node:alpine

WORKDIR /usr/app

RUN npm install -g serve --only=production

COPY --from=builder /app/dist /usr/app/dist

EXPOSE 8080

CMD ["serve", "dist", "-l", "8080"]