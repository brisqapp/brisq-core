FROM node:16-alpine

WORKDIR /brisq-core

RUN npm install -g nodemon

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD . .

ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "run", "nodemon"]
