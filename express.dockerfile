FROM node:16-alpine3.15

WORKDIR /usr/src/app

RUN mkdir docker-upload

ARG EXPRESS_PORT

EXPOSE ${EXPRESS_PORT}

RUN apk add yarn

COPY package.json yarn.lock ./

RUN yarn install

COPY dist ./dist/


CMD ["node", "./dist/index.js"]