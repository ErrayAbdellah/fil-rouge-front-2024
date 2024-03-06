FROM  node:20.11.1-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

RUN npm install -g @angular/cli@16.1.0

COPY . .

RUN ng build --configuration=production

EXPOSE 4200

CMD ["ng","serve"]