FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
COPY ./wait-for-it.sh . 

CMD ["npm", "run", "dev"]