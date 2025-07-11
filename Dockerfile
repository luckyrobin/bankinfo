FROM node:slim

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/project

WORKDIR /usr/src/project

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i --registry=https://registry.npm.taobao.org
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 7001

CMD [ "npm", "run", "start" ]
