#!/bin/bash
pwd
mkdir -p /etc/birkeland
base64 -w0 ~/.lnd/tls.cert > tlscert 
base64 -w0 ~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon > btc_admin_macroon
mv tlscert /etc/birkeland/
mv btc_admin_macroon /etc/birkeland/
exit