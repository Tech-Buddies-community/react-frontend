# 1️⃣ Gunakan image Node.js sebagai base image
FROM node:current-alpine3.18 

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
