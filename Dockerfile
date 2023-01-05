FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY /etc/birkeland /etc/birkeland

RUN git clone https://github.com/rubansundararaj/birkeland_lnd_grpc.git .

RUN npm install

EXPOSE 9990

CMD ["npm", "start"]
