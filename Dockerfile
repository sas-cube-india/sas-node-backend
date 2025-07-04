FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install adminjs @adminjs/express @adminjs/prisma
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
