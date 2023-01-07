var express = require("express");
var apirouter = express.Router();

var birkeland_wallet_controller = require("./controller");

apirouter.post("/wallet", birkeland_wallet_controller.create_a_wallet);
apirouter.get("/wallets", birkeland_wallet_controller.get_all_wallets);
apirouter.get("/wallet", birkeland_wallet_controller.get_all_wallet);
module.exports = apirouter;
