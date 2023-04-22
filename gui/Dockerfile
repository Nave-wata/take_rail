FROM node:18.16.0
WORKDIR /app
RUN chown -R node:node /app
COPY . .
RUN npm install
RUN npm run build
USER node