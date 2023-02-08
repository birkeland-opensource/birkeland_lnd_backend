#!/bin/bash

pid=$(pidof lnd)
if [ -n "$pid" ]; then
  echo "lnd is already running with PID $pid."
  exit 1
fi

nohup lnd &