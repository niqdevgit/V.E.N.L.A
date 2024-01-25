FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y apache2 \
    && service apache2 start \
    && npm ci \
    && npm run build:container \
    && cp -r /usr/src/app/dist /var/www/html/

CMD ["apache2ctl", "-D", "FOREGROUND"]


