FROM node:16-alpine
WORKDIR /brisq-core
RUN pwd
RUN ls -lisa

COPY ./brisq_core/ .

RUN npm install -g nodemon
RUN pwd
RUN ls -lisa
RUN npm install
CMD npm run nodemon
