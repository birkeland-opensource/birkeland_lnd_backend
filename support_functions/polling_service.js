const { LND_GRPC_OPERATION } = require("test_birkeland_lnd/operations");
const {PerformAuthenticatedOperation} = require("test_birkeland_lnd");
const topup_birkeland_wallet_item = require("./../birkeland_controller/../birkeland_wallets/topup_birkeland_wallet_item");

const poll_and_update_on_chain_transaction = async () => {
  try {
    console.log("poll_and_update_on_chain_transaction")
    let filter = { transaction_confirmed: false };
    
    let birkeland_wallet_topup_tx = await topup_birkeland_wallet_item.find(filter);
    let utxos = await PerformAuthenticatedOperation({operation : LND_GRPC_OPERATION.GET_U_TXOS});
    console.log(birkeland_wallet_topup_tx)
    console.log("---------------------------------")
    console.log(utxos)
    // for (let count =0;count <resp.length; count++) {
    //     let filter_object = { 
    //         chain_address : resp[count]["chain_address"],
    //         public_key : resp[count]["public_key"],
    //         wallet_id : resp[count]["wallet_id"],
    //         user_id : resp[count]["user_id"]
    //     }
    //     console.log(filter_object)

    // }
   
  } catch (err) {
    console.log(err);
  }
};

const get_wallet_top_tx_status = (result, utxos) =>{
  var lnd_utxos = utxos["utxos"];
  for (var i = 0; i < result.length; i++) {
    var chain_address = result[i]["chain_address"];
  for(var count = 0; count < lnd_utxos.length; count++){
    console.log(`${chain_address} === ${lnd_utxos[count]["address"]}`)
    if(chain_address === lnd_utxos[count]["address"])
    {
      let update_object = lnd_utxos[count]
      update_object["_id"] = result[i]?._id;
      return {success : true,message : update_object}
    }
  }
}
  return {success : false}
}

module.exports={poll_and_update_on_chain_transaction,get_wallet_top_tx_status}