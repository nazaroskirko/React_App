FROM node:8.5.0-alpine

RUN mkdir -p /usr/www
WORKDIR /usr/www

ENTRYPOINT [ "./entrypoint.sh" ]