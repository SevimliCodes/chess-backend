FROM node:25-alpine

WORKDIR app/

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm build
RUN npm migrate

CMD["node", "dist/main.js"]
