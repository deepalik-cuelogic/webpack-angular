FROM ubuntu:16.04

#installing node
RUN sudo apt-get update && apt-get install curl -y
RUN sudo curl -sl https://deb.nodesource.com/setup_7.x | sudo -E bash
RUN sudo apt-get install -y nodejs

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080

#starting node server
CMD [ "npm", "start" ]
