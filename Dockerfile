FROM ubuntu:16.04

# Set the working directory to /app
WORKDIR /app

RUN apt-get update -y
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
RUN apt-get install -y libsodium-dev
RUN apt-get install -y netcat

# Copy the current directory contents into the container at /app
ADD . /app

ENV PATH "$PATH:/app"

# Run start script when the container launches
# CMD [ "bash", "startQuorum.sh" ]
CMD [ "bash", "startQuorum.sh" ]
