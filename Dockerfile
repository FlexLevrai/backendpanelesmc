# Étape de construction
FROM node:18-alpine as build

# WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY server.js . 

EXPOSE 3000

CMD ["server.js"]
