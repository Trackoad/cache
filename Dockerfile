FROM node:23.11.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENTRYPOINT ["node", "src/index.mjs"]