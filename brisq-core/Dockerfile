FROM node:16-alpine
WORKDIR /brisq-core
COPY . .
RUN npm install -g nodemon
RUN pwd
RUN ls -lisa
RUN cd brisq-core/
RUN npm install
CMD npm run nodemon
