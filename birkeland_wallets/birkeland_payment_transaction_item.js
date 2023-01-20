const mongoose = require("mongoose");
const birkeland_wallet_transaction_schema = new mongoose.Schema({

    transaction_id : {
        type: String,
        required: true,
        unique: true,
    },
    memo : {
        type: String,
        required: false,
        unique: false,
    },
    payment_request_hash : {
        type: String,
        required: true,
        unique: false,
    },
    wallet_id : {
        type: String,
        required: true,
        unique: false,
    },
    user_id : {
        type: String,
        required: true,
        unique: false,
    },
    amount_in_msats :{
        type: Number,
        required: true,
        unique: false,
    },
    public_key : {
        type: String,
        required: true,
        unique: false, 
    },
    date_created :{
        type: Date,
        required: true,
        unique: false,
    },
    intent :{
        type: String,
        required: true,
        unique: false,
    },
    date_updated :{
        type: Date,
        required: true,
        unique: false,
    },
    payment_satus :{
        type: String,
        required: true,
        unique: false,
    },
});

const birkeland_wallet_transaction_item = mongoose.model(
  "birkeland_wallet_transaction_item",
  birkeland_wallet_transaction_schema
);

module.exports = birkeland_wallet_transaction_item;