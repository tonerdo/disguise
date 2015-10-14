FROM ubuntu:15.04

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y mongodb-org

COPY . /app
WORKDIR /app

RUN npm install -g bower
RUN npm install
RUN bower install

RUN mongod

EXPOSE 8080
EXPOSE 1025

ENTRYPOINT node server.js