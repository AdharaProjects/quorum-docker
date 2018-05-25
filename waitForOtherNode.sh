#!/bin/bash
echo "Waiting for '$HOST_IP:$PORT' to become active"
while ! nc -z $HOST_IP $PORT; do
  sleep 1
  echo "Still waiting for '$HOST_IP:$PORT' to become active"
done
