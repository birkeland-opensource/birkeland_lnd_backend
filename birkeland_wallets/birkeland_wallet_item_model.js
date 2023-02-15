const mongoose = require("mongoose");

const birkeland_wallet_schema = new mongoose.Schema({
  main_wallet_public_key: {
    type: String,
    required: true,
    unique: false,
  },
  on_chain_address: {
    type: String,
    required: true,
    unique: true,
  },
  wallet_name : {
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
    unique: true,
  },
  admin_key: {
    type: String,
    required: true,
    unique: true,
  },
  read_key: {
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
  wallet_balance_in_mstats: {
    type: Number,
    required: true,
    unique: false,
  },
  self_custodial_wallet_address : {
    type: String,
    required: false,
    unique: false,
  },
  auto_transact_min_sats : {
    type: Number,
    required: false,
    unique: false,
  },
  do_loop_back_transfer : {
    type : Boolean,
    required: false,
    unique : false
  }
});

const birkeland_wallet_item = mongoose.model(
  "birkeland_wallet_item",
  birkeland_wallet_schema
);

module.exports = birkeland_wallet_item;
