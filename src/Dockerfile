FROM node:13-alpine


RUN mkdir -p /home/app

COPY ./app /home/app 
WORKDIR  /home/app
RUN npm install


CMD [ "node", "/home/app/app.js" ]

