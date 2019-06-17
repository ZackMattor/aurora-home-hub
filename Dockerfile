from node:11-alpine

WORKDIR /usr/src/app

# Copy just package files for caching reasons
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8081
CMD [ "yarn", "start" ]
