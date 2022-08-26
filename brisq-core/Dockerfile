FROM node:16-alpine
WORKDIR /brisq-core
RUN pwd
RUN ls -lisa

COPY . .

RUN pwd
RUN ls -lisa

RUN npm install -g nodemon
RUN pwd
RUN ls -lisa
RUN npm install
CMD npm run nodemon
