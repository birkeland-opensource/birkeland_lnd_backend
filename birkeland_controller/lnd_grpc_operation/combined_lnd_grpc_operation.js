const {
  getWalletInfo,
  authenticatedLndGrpc,
  getChainBalance,
  getChannelBalance,
  getWalletVersion,
} = require("lightning");

const fs = require("fs");
const tls_cert = fs.readFileSync("/etc/birkeland/tlscert", {
    encoding: "utf8",
    flag: "r",
  });

const base_sixtyfoir_macroon = fs.readFileSync("/etc/birkeland/btc_admin_macroon", {
    encoding: "utf8",
    flag: "r",
  });

exports.get_lnd_dashboard_info = async (req, res) => {

  try {
    const { lnd } = authenticatedLndGrpc({
        cert: tls_cert,
        macaroon: base_sixtyfoir_macroon,
        socket: "127.0.0.1:10009",
        //socket: "10.2.209.103:10009",
      });
      let chain_balance = await getChainBalance({ lnd: lnd });
      let channel_balance = await getChannelBalance({ lnd: lnd });
      let wallet_info = await getWalletInfo({ lnd: lnd });
      let wallet_version = await getWalletVersion({ lnd: lnd });
      let dash_board_info_object = {
        "chain_balance" :chain_balance,
        "channel_balance" :channel_balance,
        "wallet_info" :wallet_info,
        "wallet_version" :wallet_version
      }
      return res.status(200).send({ success: true, message: dash_board_info_object });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};
