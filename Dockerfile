FROM node

EXPOSE 8080

RUN useradd -md /usr/src forms
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install

COPY . /usr/src

RUN chown -R forms /usr/src
USER forms

ENTRYPOINT ["npm"]
CMD ["start"]
