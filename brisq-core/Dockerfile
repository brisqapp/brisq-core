FROM node:16-alpine
RUN npm install -g nodemon
#WORKDIR /brisq-core
RUN pwd
RUN ls -lisa
COPY ./package.json .
RUN npm install
COPY . .
CMD npm run nodemon
