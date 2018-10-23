#!/bin/bash

# These variables must be ip addresses - resolve them if they are host names
if [[ -n "$DEPENDENT_IP" && ! $DEPENDENT_IP =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  DEPENDENT_IP=$(host $DEPENDENT_IP | awk '/has address/ { print $4 }')
fi
if [[ -n "$COORDINATING_IP" && ! $COORDINATING_IP =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  COORDINATING_IP=$(host $COORDINATING_IP | awk '/has address/ { print $4 }')
fi
if [[ -n "$IP" && ! $IP =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  IP=$(host $IP | awk '/has address/ { print $4 }')
fi

cd /app/QuorumNetworkManager
if [ -n "$DEPENDENT_IP" ]; then PORT=20010 HOST_IP=$DEPENDENT_IP ../waitForOtherNode.sh; fi
KEEP_FILES=false NODE_NAME=node1 CONSENSUS=istanbul node setupFromConfig.js
