FROM node:8-jessie

# Set the working directory to /app
WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y netcat

# keep the docker container running so you can copy your tests over and execute ethereum
#   See: https://stackoverflow.com/a/42873832/3103033
ENTRYPOINT ["tail", "-f", "/dev/null"]
