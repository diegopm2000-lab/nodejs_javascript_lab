FROM node:12.16.0-alpine

LABEL mantainer="Diego Perez Molinero @"

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY ca-crt.pem /usr/local/share/ca-certificates/DIEGO.crt
RUN update-ca-certificates

# RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir /app

ADD . /app
WORKDIR /app

RUN rm -rf node_modules/

RUN npm install --only=prod