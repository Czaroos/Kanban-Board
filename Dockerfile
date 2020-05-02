FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm install
WORKDIR /app
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]
