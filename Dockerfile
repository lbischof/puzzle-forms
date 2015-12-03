FROM node
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install
COPY forms /usr/src/forms
COPY app /usr/src/app

EXPOSE 8080

ENV SERVER_IP 0.0.0.0
ENV DISABLE_AUTH true

CMD ["npm","start"]
