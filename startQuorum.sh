#!/bin/bash

echo "in the start qnm script"
cd /app/QuorumNetworkManager
if [ -n "$DEPENDENT_IP" ]; then PORT=20010 HOST_IP=$DEPENDENT_IP ../waitForOtherNode.sh; fi
KEEP_FILES=false NODE_NAME=node1 CONSENSUS=istanbul node setupFromConfig.js
