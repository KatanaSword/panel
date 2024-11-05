FROM node:22

WORKDIR /panel/backend

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
