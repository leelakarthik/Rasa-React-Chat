FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install 
RUN npm install react-scripts

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]


