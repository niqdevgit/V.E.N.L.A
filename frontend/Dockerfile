FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y samba
RUN mkdir -p /usr/src/sambashare
COPY smb.conf /etc/samba/smb.conf

RUN npm ci

CMD npm run build:container
CMD cp -r /usr/src/app/dist /usr/src/sambashare/
CMD ["smbd", "--foreground", "--no-process-group"]

