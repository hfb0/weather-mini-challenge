FROM node:12.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]
