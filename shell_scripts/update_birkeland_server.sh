#!/bin/bash

echo "updating birkeland server"
cd /root/birkeland/birkeland_lnd_backend && rm package-lock.json
cd /root/birkeland/birkeland_lnd_backend && git pull
npm i
pm2 restart index.js
echo "done updating birkeland server"