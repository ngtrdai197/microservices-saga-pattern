FROM node:16-alpine

WORKDIR /app

RUN apk add alpine-sdk

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
