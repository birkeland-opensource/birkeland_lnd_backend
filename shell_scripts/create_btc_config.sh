#!/bin/bash

# Check if the .bitcoin folder exists, create it if not
if [ ! -d "$HOME/.bitcoin" ]; then
  mkdir "$HOME/.bitcoin"
fi

# Go to the .bitcoin folder
cd "$HOME/.bitcoin"

# Create the bitcoin.conf file if it doesn't exist, or append to it if it does
{
  echo "assumevalid=0"
  echo "txindex=1"
  echo "debug=net"
  echo "# Allows LND to connect to the Bitcoin node via an RPC user & pass"
  echo "rpcuser=birkeland"
  echo "rpcpassword=birkeland"
  echo "# Allows LND & Bitcoin Core to communicate via ZeroMQ"
  echo "zmqpubrawblock=tcp://127.0.0.1:28332"
  echo "zmqpubrawtx=tcp://127.0.0.1:28333"
} >> bitcoin.conf
