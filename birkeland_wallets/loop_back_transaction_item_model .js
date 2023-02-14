const mongoose = require("mongoose");

const loop_back_transaction_schema = new mongoose.Schema({
  
  publick_key: {
    type: String,
    required: true,
    unique: false,
  },
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  wallet_id: {
    type: String,
    required: true,
    unique: false,
  },
  auto_transact_min_sats: {
    type: String,
    required: true,
    unique: false,
  },
  transferred_sats: {
    type: String,
    required: true,
    unique: false,
  },
  date_created: {
    type: String,
    required: true,
    unique: false,
  },
  last_udapted: {
    type: String,
    required: true,
    unique: true,
  },
  transaction_satus: {
    type: String,
    required: true,
    unique: false,
  },
  transaction_id: {
    type: String,
    required: true,
    unique: true,
  },
  transaction_fee_in_sats: {
    type: Number,
    required: true,
    unique: false,
  }
});

const loop_back_transaction_item = mongoose.model(
  "loop_back_transaction_item",
  loop_back_transaction_schema
);

module.exports = loop_back_transaction_item;
