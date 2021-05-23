FROM node:alpine

RUN mkdir /app


WORKDIR /app


COPY package.json /app


RUN npm install


COPY . /app

ENV PORT=3000

EXPOSE 3000


RUN npm run build
