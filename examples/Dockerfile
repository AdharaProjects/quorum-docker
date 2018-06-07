FROM ubuntu:17.10

# Set the working directory to /app
WORKDIR /app

RUN apt-get update -y
# RUN apt-get -y install curl
# install docker
RUN apt-get install -y curl apt-transport-https ca-certificates curl software-properties-common
# RUN dhclient eth1
RUN apt-get install -y software-properties-common --fix-missing
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu artful stable"
RUN apt-get update
RUN apt-get install -y docker-ce

# install node - for convenience sake
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

# install docker-compose
RUN curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
