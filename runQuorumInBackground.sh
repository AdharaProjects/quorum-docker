cd /app/QuorumNetworkManager
KEEP_FILES=false NODE_NAME=node1 CONSENSUS=istanbul node setupFromConfig.js &
bash /app/checkPort.sh
