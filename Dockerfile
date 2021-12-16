FROM node:alpine
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY src/middleware/ ./middleware/
COPY src/books/models/ ./models/
COPY src/web/routes/ ./routes/
COPY src/web/views/ ./views/

CMD ["npm", "run", "start"]