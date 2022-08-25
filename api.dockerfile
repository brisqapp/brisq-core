FROM node:16-alpine 
RUN npm install -g nodemon
WORKDIR /app
COPY . .
RUN npm ci 
ENV NODE_ENV production
EXPOSE 8000