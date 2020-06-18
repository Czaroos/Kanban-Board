FROM node:12
WORKDIR /usr/src/app/backend
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 5000
CMD ["node","server.js"]

