#!/bin/bash

# Check if the .lnd folder exists
if [ ! -d "/root/.lnd" ]; then
  # If it doesn't exist, create it
  mkdir /root/.lnd
fi

# Create the lnd.conf file
cat > /root/.lnd/lnd.conf << EOL
## LND Settings
# Lets LND know to run on top of Bitcoin (as opposed to Litecoin)
bitcoin.active=true
bitcoin.mainnet=true
# Lets LND know you are running Bitcoin Core (not btcd or Neutrino)
bitcoin.node=bitcoind
## Bitcoind Settings
# Tells LND what User/Pass to use to RPC to the Bitcoin node
bitcoind.rpcuser=birkeland
bitcoind.rpcpass=birkeland
# Allows LND & Bitcoin Core to communicate via ZeroMQ
bitcoind.zmqpubrawblock=tcp://127.0.0.1:28332
bitcoind.zmqpubrawtx=tcp://127.0.0.1:28333
## Zap Settings
# Tells LND to listen on all of your computer's interfaces
# This could alternatively be set to your router's subnet IP
tlsextraip=0.0.0.0
# Tells LND where to listen for RPC messages
# This could also be set to your router's subnet IP
rpclisten=0.0.0.0:10009
#Specify the interfaces to listen on for p2p connections. One listen
#address per line.
# All ipv4 on port 9735:
listen=0.0.0.0:9735
EOL

# Give the user confirmation that the script has finished running
echo "The .lnd folder and lnd.conf file have been created."
