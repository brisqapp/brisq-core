FROM node:16-alpine
#WORKDIR /brisq-core
COPY . .
RUN npm install -g nodemon
RUN npm install
ENV NODE_ENV production
EXPOSE 8080
CMD ["npm", "run", "prod"]
