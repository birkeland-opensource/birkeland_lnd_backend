const birkeland_wallet_item = require("./birkeland_wallet_item_model");

const { v4: uuidv4 } = require("uuid");
const { get_node_public_key } = require("../support_functions/utils");
const birkeland_lnd_custom_macaroon = require('birkeland_lnd_custom_macaroon')

exports.create_a_wallet = async (req, res) => {
  try {
    // Later get mainwallet public key from the LND
    let { user_id } = req.query;
    let { wallet_name } = req.body;
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      let public_address = await birkeland_lnd_custom_macaroon.PerformAuthenticatedOperation({operation : "create_chain_address"});
      global.node_public_key = public_key_resp?.public_key;

      var object = {
        on_chain_address : public_address?.message?.address,
        main_wallet_public_key: global.node_public_key,
        wallet_name: wallet_name,
        user_id: user_id,
        wallet_id: uuidv4(),
        admin_key: uuidv4(),
        read_key: uuidv4(),
        date_created: new Date(),
        last_udapted: new Date(),
        wallet_balance_in_mstats: 0,
      };
      await birkeland_wallet_item.create(object);
      return res.status(200).send({ success: true });
    }
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

exports.get_all_wallets = async (req, res) => {
  try {
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      var result = await birkeland_wallet_item.find({
        main_wallet_public_key: global.node_public_key,
      });
      return res.status(200).send({ success: true, message: result });
    }
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};

exports.get_all_wallets_by_user_id = async (req, res) => {
  try {
    var public_key_resp = await get_node_public_key(res);
    let { user_id } = req.query;
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      var result = await birkeland_wallet_item.find({ user_id : user_id,
        main_wallet_public_key: global.node_public_key,
      });
      return res.status(200).send({ success: true, message: result });
    }
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};

exports.get_one_wallet = async (req, res) => {
  try {

    var { user_id, wallet_id } = req.query;
    if (user_id && wallet_id) {
      var filter = {
        user_id: user_id,
        wallet_id: wallet_id
      };

      // var returnObject = {};
      var result = await birkeland_wallet_item.findOne(filter);
      return res.status(200).send({ success: true, message: result });
    }
    else{
      return res.status(400).send({ success: false });
    }
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};

exports.check_endpoint_is_authenticated = async (req, res) => {
  try {
    return res.status(200).send({ success: true, message: "authenticated" });
  } catch (err) { }
};
