FROM node:18.16.0

WORKDIR /app

COPY . .

RUN chown -R node:node /app

USER node

RUN npm install
RUN npm run build