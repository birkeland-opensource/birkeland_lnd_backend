const mongoose = require("mongoose");
const birkeland_payment_transaction_schema = new mongoose.Schema({

    transaction_id : {
        type: String,
        required: true,
        unique: true,
    },
    lnd_transaction_id : {
        type: String,
        required: false,
        unique: false,
    },
    payment_request_hash : {
        type: String,
        required: true,
        unique: true,
    },
    from_wallet_id : {
        type: String,
        required: true,
        unique: false,
    },
    to_wallet_id : {
        type: String,
        required: false,
        unique: false,  
    },
    fiat_currency :{
        type: String,
        required: true,
        unique: false,
    },
    amount_in_fiat_currency :{
        type: Number,
        required: true,
        unique: false,
    },
    amount_in_msats :{
        type: Number,
        required: true,
        unique: false,
    },
    from_public_key : {
        type: String,
        required: true,
        unique: false, 
    },
    to_public_key :{
        type: String,
        required: false,
        unique: false, 
    },
    date_created :{
        type: Date,
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
    description :{
        type: String,
        required: false,
        unique: false,
    },
});

const birkeland_payment_transaction_item = mongoose.model(
  "birkeland_payment_transaction_item",
  birkeland_payment_transaction_schema
);

module.exports = birkeland_payment_transaction_item;