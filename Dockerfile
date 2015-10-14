FROM ubuntu:15.04

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y mongodb

COPY . /app
WORKDIR /app

RUN npm install -g bower
RUN npm install
RUN bower install
RUN npm install forever -g

RUN mongod

EXPOSE 8080
EXPOSE 1025

ENTRYPOINT forever start server.js