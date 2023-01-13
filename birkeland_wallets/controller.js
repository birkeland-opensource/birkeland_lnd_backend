const birkeland_wallet_item = require("./birkeland_wallet_item_model");
const { v4: uuidv4 } = require("uuid");

exports.create_a_wallet = async (req, res) => {
  try {
    // Later get mainwallet public key from the LND 
    let { user_id,main_wallet_public_key,wallet_name } = req.body;
    var object = {
      main_wallet_public_key : main_wallet_public_key,
      wallet_name : wallet_name,
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
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

exports.get_all_wallets = async (req, res) => {
  try {
   
    // var returnObject = {};
    console.log("get_all_wallets")
    var result = await birkeland_wallet_item.find({});
    return res.status(200).send({ success: true, message: result });
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};

exports.get_all_wallet = async (req, res) => {
  try {
    var filter = {
      user_id : req.query.user_id,
      wallet_id: req.query.wallet_id,
    };
    // var returnObject = {};
    var result = await birkeland_wallet_item.findOne({filter});
    return res.status(200).send({ success: true, message: result });
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};
