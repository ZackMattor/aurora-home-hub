from node:10-alpine

WORKDIR /usr/src/app

# Copy just package files for caching reasons
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]
