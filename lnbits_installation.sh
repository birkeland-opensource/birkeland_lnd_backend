#!/bin/bash 

set +x 
echo "Installing LNBits" 
pwd 
sudo -v 
cd ~ 
mkdir -p birkeland/lnbits 
cd birkeland/lnbits 
git clone https://github.com/lnbits/lnbits-legend.git 
cd lnbits-legend/ 
sudo apt update 
sudo apt install software-properties-common 
sudo add-apt-repository ppa:deadsnakes/ppa	
sudo apt install python3.9 python3.9-distutils 
curl -sSL https://install.python-poetry.org | python3 - 
export PATH="/home/user/.local/bin:$PATH"  
poetry env use python3.9 
poetry install --only main
mkdir data 
cp .env.example .env 
nano .env 
exit