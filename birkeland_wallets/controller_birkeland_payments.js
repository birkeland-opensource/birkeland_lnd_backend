const birkeland_payment_transaction_item = require("./birkeland_payment_transaction_item");
const topup_birkeland_wallet_item = require("./topup_birkeland_wallet_item");

const test_birkeland_lnd = require("test_birkeland_lnd");

const { v4: uuidv4 } = require("uuid");
const {
  BIRKELAND_WALLET_TRANSACTION_STATUS,
} = require("../support_functions/constants");
const { LND_GRPC_OPERATION } = require("test_birkeland_lnd/operations");

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
      return res.status(200).send({ success: true });
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
    let filter = { public_key : public_key,wallet_id :wallet_id,user_id : user_id}
    let result = (await topup_birkeland_wallet_item.find(filter)).reverse();
    return res.status(200).send({ success: true, message: result[0] });
  }
  catch(err){
    return res.status(400).send({ success: false });
  }
}

exports.transactions = async (req, res) => {
  try {
    // Query the database with from_wallet_id to get alltransactions
  } catch (err) {}
};
exports.create_a_payment_request = async (req, res) => {
  try {
    var {
      from_wallet_id,
      to_wallet_id,
      from_public_key,
      to_public_key,
      fiat_currency,
      amount_in_fiat_currency,
      amount_in_msats,
      payment_request_hash,
      description,
    } = req.body;
    let birkeland_payment_transaction_item_object = {
      transaction_id: uuidv4(),
      payment_request_hash: payment_request_hash,
      from_wallet_id: from_wallet_id,
      to_wallet_id: to_wallet_id,
      fiat_currency: fiat_currency,
      amount_in_fiat_currency: amount_in_fiat_currency,
      amount_in_msats: amount_in_msats,
      from_public_key: from_public_key,
      to_public_key: to_public_key,
      payment_satus: BIRKELAND_WALLET_TRANSACTION_STATUS.CREATED,
      description: description,
    };

    console.log(birkeland_payment_transaction_item_object);

    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

exports.make_a_payment = async (req, res) => {
  try {
  } catch (err) {}
};

exports.pending_payments = async (req, res) => {
  try {
  } catch (err) {}
};
