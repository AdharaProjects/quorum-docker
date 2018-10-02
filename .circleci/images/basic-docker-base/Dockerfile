FROM ubuntu:17.10

# Set the working directory to /app
WORKDIR /app

RUN apt-get update -y

# install docker
RUN apt-get install -y curl apt-transport-https ca-certificates curl software-properties-common
RUN apt-get install -y software-properties-common --fix-missing
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu artful stable"
RUN apt-get update
RUN apt-get install -y docker-ce

# install docker-compose
RUN curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
