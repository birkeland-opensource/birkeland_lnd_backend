const birkeland_payment_transaction_item = require("./birkeland_payment_transaction_item");
const { v4: uuidv4 } = require("uuid");
const {
  BIRKELAND_WALLET_TRANSACTION_STATUS,
} = require("../support_functions/constants");
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
