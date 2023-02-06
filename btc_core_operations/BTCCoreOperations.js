//const Client = require("bitcoin-core");
const bitcoin = require("bitcoin-core");

// const client = new Client({
//   host: "127.0.0.1",
//   port: 8332,
//   username: "birkeland",
//   password: "birkeland",
//   network: "mainnet",
// });

const btc_client = new bitcoin({
  network: "mainnet",
  username: "birkeland",
  password: "birkeland",
  host: "127.0.0.1",
  port: 8332,
});

class BTCCoreOperations {
  get_block_chain_info = async () => {
    try {
      console.log("get_block_chain_info");
      let blockchainInfo = await btc_client.getBlockchainInfo();
      return { success: true, message: blockchainInfo };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  //   create_Wallet = (params) => {
  //     let { password } = params;
  //     btc_client.createWallet("mywallet", { password : password }, function (err, result) {
  //       if (err) {
  //         console.error(err);
  //         return { success: false, message: err };
  //       } else {
  //         console.log("Wallet created:", result);
  //         return { success: false, message: result };
  //       }
  //     });
  //   };
  // }

  create_wallet = async (params) => {
    let { password, wallet_name } = params;
    try {
      let result = await btc_client.createWallet(wallet_name,{passphrase : password});
      console.log("Wallet created:", result);
      return { success: true, message: result };
    } catch (err) {
      console.error(err);
      return { success: false, message: err };
    }
  };
}

module.exports = { BTCCoreOperations };
