FROM node:lts-stretch

# Install yarn
RUN npm i -g yarn --force

# Create dir to work if not exists
RUN mkdir -p /usr/src/app

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock

RUN cd /tmp/ && yarn

RUN cp -a /tmp/node_modules /usr/src/app/
RUN cd /usr/src/app

# Move to workdir
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN yarn start:dev