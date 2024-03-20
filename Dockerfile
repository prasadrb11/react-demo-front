FROM node:16
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY src/package*.json ./
RUN npm install --production --silent
COPY src/. .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
