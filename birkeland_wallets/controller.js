const birkeland_wallet_item = require("./birkeland_wallet_item_model");
const { v4: uuidv4 } = require("uuid");
const short = require("short-uuid");

exports.create_a_wallet = async (req, res) => {
  try {
    // Later get mainwallet public key from the LND 
    let { user_id,main_wallet_public_key } = req.body;
    var object = {
      main_wallet_public_key : main_wallet_public_key,
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
    var filter = {
      main_wallet_public_key: req.query.main_wallet_public_key,
    };
    // var returnObject = {};
    var result = await birkeland_wallet_item.find({filter});
    return res.status(200).send({ success: true, message: result });
  } catch (e) {
    return res.status(400).send({ success: false });
  }
};
