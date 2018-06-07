#!/bin/bash

# required parameters for this script:
#   KEEP_FILES=false NODE_NAME=node1 CONSENSUS=istanbul
# optional parameters:
#   DEPENDENT_IP
cd /app/QuorumNetworkManager
if [ -n "$DEPENDENT_IP" ]; then PORT=20010 HOST_IP=$DEPENDENT_IP ../waitForOtherNode.sh; fi
node setupFromConfig.js &
bash /app/checkPort.sh
