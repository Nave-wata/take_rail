FROM node:18.16.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN chown -R node:node /app
USER node