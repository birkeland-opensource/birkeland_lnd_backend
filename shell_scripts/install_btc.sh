#!/bin/bash
pwd
apt-get update
apt-get install git
mkdir -p ~/code
cd ~/code && git clone https://github.com/bitcoin/bitcoin.git
cd ~/code/bitcoin && git checkout 23.x
apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libevent-dev -y
apt-get install libboost-system-dev libboost-filesystem-dev libboost-test-dev libboost-thread-dev -y
apt-get install libsqlite3-dev -y
apt-get install libminiupnpc-dev -y
apt-get install libzmq3-dev -y
apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools -y
apt-get install libqrencode-dev -y
cd ~/code/bitcoin && ./contrib/install_db4.sh
cd ~/code/bitcoin && ./autogen.sh
export BDB_PREFIX='/home/${USER}/code/bitcoin/db4'
cd ~/code/bitcoin && ./configure BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include"
cd ~/code/bitcoin && make
make install
bitcoind --daemon
exit