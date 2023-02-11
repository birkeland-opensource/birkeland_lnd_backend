const mongoose = require("mongoose");

const topup_birkeland_wallet_schema = new mongoose.Schema({
  chain_address: {
    type: String,
    required: true,
    unique: false,
  },
  public_key: {
    type: String,
    required: true,
    unique: false,
  },
  wallet_id : {
    type: String,
    required: true,
    unique: false,
  },
  transaction_id: {
    type: String,
    required: true,
    unique: true,
  },
  date_created: {
    type: Date,
    required: true,
    unique: false,
  },
  last_udapted: {
    type: Date,
    required: true,
    unique: false,
  },
  tokens: {
    type: Number,
    required: true,
    unique: false,
  },
  transaction_confirmed: {
    type: Boolean,
    required: true,
    unique: false,
  },
  confirmation_count: {
    type: Number,
    required: true,
    unique: false,
  },
  utxo_object : {
    type: {},
    required: false,
    unique: false,
  },
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
});

const topup_birkeland_wallet_item = mongoose.model(
  "topup_birkeland_wallet_item",
  topup_birkeland_wallet_schema
);

module.exports = topup_birkeland_wallet_item;
