FROM node:22.14.0-alpine

WORKDIR /test

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]