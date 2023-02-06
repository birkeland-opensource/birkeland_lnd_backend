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

  create_wallet = async (params) => {
    let { password, wallet_name } = params;
    try {
      let result = await btc_client.createWallet(wallet_name,false, false,password,false,false,null);
      console.log("Wallet created:", result);
      return { success: true, message: result };
    } catch (err) {
      console.error(err);
      return { success: false, message: err };
    }
  };

  load_wallet = async (params) => {
    let { filename, load_on_startup } = params;
    try {
      let result = await btc_client.loadWallet(filename, load_on_startup);
      console.log(result);
      return { success: true, message: result };
    } catch (err) {
      console.error(err);
      return { success: false, message: err };
    }
  };


get_wallet_info = async() =>{
  try {
    let result = await btc_client.getWalletInfo();
    console.log(result);
    return { success: true, message: result };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
}

list_wallets = async() =>{
  try {
    let result = await btc_client.listWallets();
    console.log(result);
    return { success: true, message: result };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
}

list_wallet_dir = async()=>{
  try {
    let result = await btc_client.listWalletDir();
    console.log(result);
    return { success: true, message: result };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
}

}
module.exports = { BTCCoreOperations };
