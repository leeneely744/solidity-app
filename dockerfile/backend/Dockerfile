FROM node:19-alpine3.17

RUN apk update
RUN apk add zsh vim shadow

# npmを最新にする
RUN npm update -g npm
RUN npm install -g truffle