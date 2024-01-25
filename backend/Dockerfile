FROM node:18
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci
  
USER node
RUN chmod +x ./getBuild.sh

CMD ["sh", "-c", "./getBuild.sh && npm start"]