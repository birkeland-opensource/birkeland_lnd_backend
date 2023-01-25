var express = require("express");
const { auth_birkeland_wallet_access, decode_node_auth_jwt_token } = require("../support_functions/utils");
var apirouter = express.Router();

var birkeland_wallet_controller = require("./controller");
var controller_birkeland_payments = require("./controller_birkeland_payments");

apirouter.post("/wallet", birkeland_wallet_controller.create_a_wallet);
apirouter.get("/wallets",decode_node_auth_jwt_token, birkeland_wallet_controller.get_all_wallets);
apirouter.get("/wallet", birkeland_wallet_controller.get_one_wallet);

apirouter.post("/get_onchain_address", controller_birkeland_payments.topup_wallet);
apirouter.get("/get_wallet_topup_tx", controller_birkeland_payments.get_wallet_topup_tx);
apirouter.get("/get_wallet_topup_tx_status", controller_birkeland_payments.get_wallet_topup_tx_status);



apirouter.get("/transactions", controller_birkeland_payments.transactions);
apirouter.post("/create_invoice", controller_birkeland_payments.create_invoice);
apirouter.post("/make_a_payment", controller_birkeland_payments.make_a_payment);
apirouter.get("/pending_payments", controller_birkeland_payments.pending_payments);
apirouter.get("/decode_lightning_invoice", controller_birkeland_payments.decode_lightning_invoice);


apirouter.post("/check_endpoint_is_authenticated",auth_birkeland_wallet_access, birkeland_wallet_controller.check_endpoint_is_authenticated);



module.exports = apirouter;
