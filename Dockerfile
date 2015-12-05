FROM node

EXPOSE 8080

ENV SERVER_IP 0.0.0.0
ENV DISABLE_AUTH true

RUN useradd -md /usr/src forms
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install

COPY forms /usr/src/forms
COPY app /usr/src/app

RUN chown -R forms /usr/src
USER forms

ENTRYPOINT ["npm"]
CMD ["start"]
