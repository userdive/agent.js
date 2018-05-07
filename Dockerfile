FROM ubuntu:bionic-20180426

ENV LANG C.UTF-8
WORKDIR /var/agent.js

RUN apt-get update -q && \
    apt-get dist-upgrade -y -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      ca-certificates \
      gnupg \
      unzip \
      xvfb

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
      nodejs \
      yarn

RUN echo "deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu bionic main" | tee /etc/apt/sources.list.d/openjdk.list && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-key DA1A4A13543B466853BAF164EB9B1D8886F44E2A && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
      openjdk-8-jre \
      openjdk-8-jre-headless \
      openjdk-8-jdk \
      openjdk-8-jdk-headless

RUN curl -sS https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
      google-chrome-stable=66.0.3359.139-1 && \
    google-chrome --version

RUN apt-get clean all

COPY package.json "/var/agent.js/package.json"
RUN yarn install --ignore-scripts
RUN yarn global add wait-on

ENV DISPLAY :99
RUN printf '#!/bin/sh\nXvfb :99 -screen 0 1280x1024x24 &\nexec "$@"\n' > /tmp/entrypoint && \
    chmod +x /tmp/entrypoint && \
    mv /tmp/entrypoint /docker-entrypoint.sh

VOLUME /var/agent.js
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/bin/sh"]
