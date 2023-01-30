const birkeland_wallet_item = require("./birkeland_wallet_item_model");
const { v4: uuidv4 } = require("uuid");
const { get_node_public_key } = require("../support_functions/utils");
const {satoshisToFiat} = require("bitcoin-conversion");
const test_birkeland_lnd = require('test_birkeland_lnd')


exports.create_a_wallet = async (req, res) => {
  try {
    // Later get mainwallet public key from the LND 
    let { user_id,wallet_name } = req.body;
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
    var object = {
      main_wallet_public_key : global.node_public_key ,
      wallet_name : wallet_name,
      user_id: user_id,
      wallet_id: uuidv4(),
      admin_key: uuidv4(),
      read_key: uuidv4(),
      date_created: new Date(),
      last_udapted: new Date(),
      wallet_balance_in_mstats: 0
    };
    await birkeland_wallet_item.create(object);
    return res.status(200).send({ success: true });
 } } catch (err) {
    return res.status(400).send({ success: false });
  }
};

exports.get_all_wallets = async (req, res) => {
  try {
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
    var result = await birkeland_wallet_item.find({main_wallet_public_key : global.node_public_key });
    return res.status(200).send({ success: true, message: result });
    }
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};

exports.get_one_wallet = async (req, res) => {
  try {
    var filter = {
      user_id : req.query.user_id,
      wallet_id: req.query.wallet_id,
    };

    // var returnObject = {};
    var result = await birkeland_wallet_item.findOne(filter);
    return res.status(200).send({ success: true, message: result });
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};

exports.check_endpoint_is_authenticated = async(req, res) => {
  try{
      return res.status(200).send({ success: true, message:"authenticated" });
  }
  catch(err){

  }
}

exports.withdraw_to_onchain_address = async(req,res) => {
  try{
    var {user_id,wallet_id} = req.query;
    var {tokens,address} = req.body;
    var filter = {
      user_id : user_id,
      wallet_id: wallet_id,
    };
    var tokens_int = parseInt(tokens);
    if((tokens_int > 1) && (address.length >3)){
    var birkeland_wallet_info = await birkeland_wallet_item.findOne(filter);
    //console.log(result)
    var wallet_balance = birkeland_wallet_info["wallet_balance_in_mstats"] /1000;
    console.log(`${tokens_int} < ${wallet_balance}`);
    if(tokens_int < wallet_balance)
    {
      var withdraw_amount_in_usd = await satoshisToFiat(tokens_int,'USD');
      console.log(withdraw_amount_in_usd);
      if(withdraw_amount_in_usd > 2.2){
        //1. make request to lnd
        let on_chain_withdraw_params = {
          operation : "send_to_chain_address",
          tokens : tokens_int,
          address :address
        }
        let on_chain_withdraw_repsonse = await test_birkeland_lnd.PerformAuthenticatedOperation(on_chain_withdraw_params);
        console.log(on_chain_withdraw_repsonse["success"])
        if(on_chain_withdraw_repsonse["success"]){
            //2. if the request is success detuct from the wallet
            var updated_balance = wallet_balance - tokens_int;
            let updatd_object = {
              last_udapted : new Date(),
              wallet_balance_in_mstats : updated_balance *1000
            };
            await birkeland_wallet_item.findOneAndUpdate(filter,updatd_object);
            return res.status(200).send({ success: true, message: on_chain_withdraw_repsonse });
        }
        else{
          return res.status(500).send({ success: false,message : on_chain_withdraw_repsonse["message"] });
        }
      }
      else{
        return res.status(500).send({ success: false,message : "Minimum Sats to withdraw is 3$ or more" });
      }
    
    }
    else{
      return res.status(500).send({ success: false,message : "Insufficient balance" });
    }
  
    }
  }
  catch(err){
    console.log(err)
  }
}
