FROM ubuntu:15.04
FROM node:latest

COPY . /app
WORKDIR /app

RUN sudo npm install -g bower
RUN sudo npm install
RUN sudo bower install
RUN sudo npm install forever -g

EXPOSE 8080
EXPOSE 1025

ENTRYPOINT forever start server.js