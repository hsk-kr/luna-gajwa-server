FROM node:12.22.0-alpine3.10
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]