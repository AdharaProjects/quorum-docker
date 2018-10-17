FROM ubuntu:16.04

# Set the working directory to /app
WORKDIR /app

RUN apt-get update -y
RUN apt-get -y install curl dnsutils libsodium-dev netcat git make g++
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs

# Copy the current directory contents into the container at /app
ADD . /app

# remove old node node_modules (if exist) and re-install
RUN cd QuorumNetworkManager; \
    if [ -d "node_modules" ]; then rm -r node_modules; fi; \
    npm install \
    cd ..

ENV PATH "$PATH:/app"

RUN chmod +x ./waitForOtherNode.sh

# Run start script when the container launches
CMD [ "bash", "startQuorum.sh" ]
