const birkeland_payment_transaction_item = require("./birkeland_payment_transaction_item");
const topup_birkeland_wallet_item = require("./topup_birkeland_wallet_item");
const birkeland_wallet_item = require("./birkeland_wallet_item_model")
const invoice = require("@node-lightning/invoice");
const test_birkeland_lnd = require("test_birkeland_lnd");

const { v4: uuidv4 } = require("uuid");
const {
  BIRKELAND_WALLET_TRANSACTION_STATUS,
} = require("../support_functions/constants");
const { LND_GRPC_OPERATION } = require("test_birkeland_lnd/operations");
const { get_wallet_top_tx_status } = require("../support_functions/polling_service");

exports.topup_wallet = async (req, res) => {
  try {
    let { public_key, wallet_id, user_id } = req.body;
    // 1. Create on chain address
    // 2. get the chain_address,public_key,wallet_id,date_created,last_udapted,tokens,transaction_confirmed,confirmation_count
    let create_chain_address_resp =
      await test_birkeland_lnd.PerformAuthenticatedOperation({
        operation: LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS,
      });

    if (create_chain_address_resp["success"]) {
      let address_message =
        create_chain_address_resp["message"];
      let wallet_topup_item = {
        chain_address: address_message["address"],
        public_key: public_key,
        wallet_id: wallet_id,
        date_created: new Date(),
        last_udapted: new Date(),
        tokens: 0,
        transaction_confirmed: false,
        confirmation_count: 0,
        user_id: user_id,
      };
      console.log(wallet_topup_item);
      await topup_birkeland_wallet_item.create(wallet_topup_item);
      return res.status(200).send({ success: true, message: { chain_address: address_message["address"] } });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "LND may not be running" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err });
  }
};

exports.get_wallet_topup_tx = async (req, res) => {
  try {
    let { public_key, wallet_id, user_id } = req.query;
    let filter = { public_key: public_key, wallet_id: wallet_id, user_id: user_id }
    let result = (await topup_birkeland_wallet_item.find(filter)).reverse();
    return res.status(200).send({ success: true, message: result[0] });
  }
  catch (err) {
    return res.status(400).send({ success: false });
  }
}

exports.get_wallet_topup_tx_status = async (req, res) => {
  try {
    var { public_key, wallet_id, user_id } = req.query;
    var filter = { public_key: public_key, wallet_id: wallet_id, user_id: user_id,transaction_confirmed:false };
    var result = await topup_birkeland_wallet_item.find(filter);
    if (result.length >0) {
      let utxos = await test_birkeland_lnd.PerformAuthenticatedOperation({ operation: LND_GRPC_OPERATION.GET_U_TXOS, min_confirmations: 3 });
      if(utxos["success"])
      {
      let update_object = get_wallet_top_tx_status(result, utxos["message"]);
      if (update_object["success"]) {
        var filtered_update_object = {
          last_udapted: new Date(),
          transaction_id: update_object["message"]["transaction_id"],
          confirmation_count: update_object["message"]["confirmation_count"],
          tokens: update_object["message"]["tokens"],
          transaction_confirmed : true
        }
        await topup_birkeland_wallet_item.findOneAndUpdate(filter,filtered_update_object);
    
        if(filtered_update_object["tokens"] >0){
          // Update wallet balance
          let wallet_filter = {
            main_wallet_public_key : public_key,
            wallet_id : wallet_id,
            user_id : user_id
          }
          let wallet_balance = await birkeland_wallet_item.findOne(wallet_filter);
          let total_wallet_balance_msats = wallet_balance["wallet_balance_in_mstats"] + (filtered_update_object["tokens"] *1000);
          let wallet_update_item = {
            wallet_balance_in_mstats : total_wallet_balance_msats,
            last_udapted : new Date()
          }

          await birkeland_wallet_item.findOneAndUpdate(wallet_filter,wallet_update_item);
        }

        return res.status(200).send({ success: true });
      }
      else{
        return res.status(500).send({ success: false, message: "No topup transactions found" });
      }
      }
      else {
        return res.status(500).send({ success: false, message: "UTXO not found" });
      }

    }
    else {
      return res.status(400).send({ success: false, message: "No wallet topup txs found" });
    }

  }
  catch (err) {
    console.log(err)
    return res.status(400).send({ success: false });
  }
}

exports.transactions = async (req, res) => {
  try {
    // Query the database with from_wallet_id to get alltransactions
    try {
      let { public_key, wallet_id, user_id } = req.query;
      let filter = { from_public_key: public_key, from_wallet_id: wallet_id, user_id: user_id }
      console.log(filter)
      let result = (await birkeland_payment_transaction_item.find(filter)).reverse();
      return res.status(200).send({ success: true, message: result });
    }
    catch (err) {
      return res.status(400).send({ success: false });
    }
  } catch (err) { }
};
exports.create_invoice = async (req, res) => {
  try {
    var {
      memo,
      from_wallet_id,
      user_id,
      sats,
      from_public_key,
    } = req.body;
    let birkeland_payment_transaction_item_object = {

      memo : memo,
      user_id : user_id,
      amount_in_msats : sats *1000,
      from_public_key : from_public_key,
      from_wallet_id : from_wallet_id,
      date_created : new Date(),
      date_updated : new Date(),
      payment_satus: BIRKELAND_WALLET_TRANSACTION_STATUS.CREATED
    };

    if(birkeland_payment_transaction_item_object["amount_in_msats"] >0)
    {
      let create_invoice_params = {
        operation : "create_invoice",
        mtokens :birkeland_payment_transaction_item_object["amount_in_msats"],
        description : from_public_key }

      let create_invoice_resp = await test_birkeland_lnd.PerformAuthenticatedOperation(create_invoice_params);
      if(create_invoice_resp["success"])
      {
        birkeland_payment_transaction_item_object["transaction_id"] = create_invoice_resp["message"]["id"];
        birkeland_payment_transaction_item_object["payment_request_hash"] = create_invoice_resp["message"]["request"];
        console.log(birkeland_payment_transaction_item_object);
        await birkeland_payment_transaction_item.create(birkeland_payment_transaction_item_object);
        return res.status(200).send({ success: true,message : create_invoice_resp});
      }
      else{
        return res.status(500).send({ success: false,message : "Lightning node maynot be running"});
      }
     
    }
    else{
      return res.status(400).send({ success: false,message :"amount cannot be zero or less than zero" });
    }
    
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false });
  }
};

exports.make_a_payment = async (req, res) => {
  try {
    var {amount_in_sats,request_hash,decoded_object, node_public_key,from_node_public_key} = req.body;
    let make_payment_object = {
      amount_in_sats: amount_in_sats,
      request_hash: request_hash,
      node_public_key: node_public_key,
      from_node_public_key : from_node_public_key
    };
    console.log(make_payment_object)
    //var
    // let make_payment_params = {
    //   operation : LND_GRPC_OPERATION.PAY,
    //   request : request_hash
    // }

    // let create_invoice_resp = await test_birkeland_lnd.PerformAuthenticatedOperation(make_payment_params);
    return res.status(200).send({ success: true,message : "create_invoice_resp"});
  } catch (err) {
    return res.status(400).send({ success: false });
   }
};

exports.pending_payments = async (req, res) => {
  try {
  } catch (err) { }
};

exports.decode_lightning_invoice = async(req,res) =>{
  try{
    
    let {payment_hash} = req.query;
    console.log(payment_hash)
    let result = invoice.decode(payment_hash);
    
    let decoded_invoice = {
      value_in_sat : result?.valueSat,
      pubkey : result?.pubkey,
      inv_payment_hash : result?.paymentHash,
      expiry : result?.expiry,
      payee_node : result?.payeeNode,
      description : result?.desc,
      description : result?.shortDesc

    }
    console.log(decoded_invoice);
    return res.status(200).send({ success: true,message : decoded_invoice});
  }
  catch(err){
    //console.log(err);
    return res.status(400).send({ success: false });
  }
}
