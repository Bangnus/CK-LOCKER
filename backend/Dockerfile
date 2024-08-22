FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN rm -rf node_modules/
RUN npm update
CMD ["npm", "run", "dev"]