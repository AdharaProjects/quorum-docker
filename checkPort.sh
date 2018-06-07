#!/bin/bash
echo "Waiting Quorum to launch on 20010..."

while ! nc -z $DOCKER_HOST 20010; do
  sleep 1
  echo "still waiting"
done

echo "Quorum is UP AND RUNNING"

# Below is just a hack to keep the node alive once the script completes running
#   Not sure what the issue is now, since this was unneeded in previous versions
while nc -z $DOCKER_HOST 20010; do
  sleep 1
  echo "still running"
done
