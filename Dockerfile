FROM node:8.12.0
WORKDIR /app
COPY package.json /app
RUN npm cache verify
RUN npm install
COPY . /app
CMD node index.js
EXPOSE 8082
