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
      return { success: true, message: result };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  load_wallet = async (params) => {
    let { filename, load_on_startup } = params;
    try {
      let result = await btc_client.loadWallet(filename, load_on_startup);
      return { success: true, message: result };
    } catch (err) {
      return { success: false, message: err };
    }
  };


get_wallet_info = async() =>{
  try {
    let result = await btc_client.getWalletInfo();
    return { success: true, message: result };
  } catch (err) {
    return { success: false, message: err };
  }
}

list_wallets = async() =>{
  try {
    let result = await btc_client.listWallets();
    return { success: true, message: result };
  } catch (err) {
    return { success: false, message: err };
  }
}

list_wallet_dir = async()=>{
  try {
    let result = await btc_client.listWalletDir();
    return { success: true, message: result };
  } catch (err) {
    return { success: false, message: err };
  }
}

received_by_address = async(params)=>{
  try{
    let {address} = params
    let result = await btc_client.listReceivedByAddress(0,false,true,address );
    return { success: true, message: result };
  }catch(err){
    return { success: false, message: err };
  }
}

get_raw_transaction = async(params) =>{
  try{
    
    let {txid} = params
    let result = await btc_client.getRawTransaction(txid,true);
    return { success: true, message: result };
  }catch(err){
    return { success: false, message: err };
  }
}

get_received_by_address = async(params) =>{
  try{
    
    let {address,minconf} = params
    let result = await btc_client.getReceivedByAddress(address,minconf);
    return { success: true, message: result };
  }catch(err){
    return { success: false, message: err };
  }
}

get_transaction = async(params) =>{
  try{
    let {txid} = params
    let result = await btc_client.getTransaction(txid,false,true);
    return { success: true, message: result };
  }catch(err){
    return { success: false, message: err };
  }
}

}
module.exports = { BTCCoreOperations };
