FROM node:16-alpine
RUN npm install -g nodemon
#WORKDIR /brisq-core
COPY ./package.json .
RUN pwd
RUN npm install
COPY . .
CMD npm run nodemon
