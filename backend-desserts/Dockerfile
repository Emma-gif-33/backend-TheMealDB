FROM node:20-alpine

# Carpeta de trabajo
WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g ts-node typescript

COPY . .

EXPOSE 3000

CMD ["node", "--loader", "ts-node/esm", "src/index.ts"]

# para correr esto:
# docker rm -f cont-back
# docker build -t bff-postres .
# docker run -d -p 3005:3000 --name cont-back bff-postres