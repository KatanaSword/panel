FROM node:22

WORKDIR /panel/backend

COPY . .

RUN npm install

EXPOSE 8888

CMD [ "npm", "run", "dev" ]