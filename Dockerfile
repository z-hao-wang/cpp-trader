FROM node:12.14-slim

RUN npm i npm@6.13.0 -g
RUN npm i pm2 -g
RUN npm i node-gyp -g

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git python python-dev build-essential wget bash ca-certificates

RUN mkdir -p /root/.ssh/
RUN chmod 0700 /root/.ssh

RUN wget https://github.com/mdsol/docker-ssh-exec/releases/download/v0.5.2/docker-ssh-exec_0.5.2_linux_amd64.tar.gz
RUN tar -xzf docker-ssh-exec_0.5.2_linux_amd64.tar.gz -C /bin && \
  cp /bin/docker-ssh-exec_0.5.2_linux_amd64/docker-ssh-exec /bin/docker-ssh-exec

RUN ssh-keyscan github.com >/root/.ssh/known_hosts
RUN ssh-keyscan bitbucket.org >/root/.ssh/known_hosts

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN docker-ssh-exec npm ci

COPY tsconfig.json binding.gyp data /app/
COPY src /app/src

ENV PYTHON_PATH /usr/include/python2.7
RUN node-gyp rebuild && npm run tsc && node src/main.js
