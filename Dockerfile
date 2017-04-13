FROM node

EXPOSE 8080

LABEL io.k8s.display-name="Puzzle Forms" \
      io.openshift.expose-services="8080:http" \
      io.openshift.tags="forms,node" \
	  io.openshift.s2i.scripts-url="image://.s2i"

RUN useradd -md /usr/src forms
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install

COPY . /usr/src

RUN chown -R forms /usr/src
USER forms

ENTRYPOINT ["npm","start"]
