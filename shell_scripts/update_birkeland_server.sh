#!/bin/bash

echo "updating birkeland server"
cd /root/birkeland/birkeland_lnd_grpc && git pull
npm i
pm2 restart index.js
echo "done updating birkeland server"