FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install pm2 -g
RUN npm i
COPY . .
EXPOSE 10001
CMD ["pm2-runtime", "server.js"]