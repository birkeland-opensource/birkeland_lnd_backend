var express = require("express");
var apirouter = express.Router();

var birkeland_wallet_controller = require("./controller");

apirouter.post("/create_a_wallet", birkeland_wallet_controller.create_a_wallet);
apirouter.get("/get_all_wallets", birkeland_wallet_controller.get_all_wallets);

module.exports = apirouter;
