var express = require("express");
const { auth_birkeland_wallet_access, decode_node_auth_jwt_token } = require("../support_functions/utils");
var apirouter = express.Router();

var birkeland_wallet_controller = require("./controller");
var controller_birkeland_payments = require("./controller_birkeland_payments");

apirouter.post("/wallet", decode_node_auth_jwt_token,birkeland_wallet_controller.create_a_wallet);
apirouter.get("/wallets",decode_node_auth_jwt_token, birkeland_wallet_controller.get_all_wallets);
apirouter.get("/wallet",decode_node_auth_jwt_token, birkeland_wallet_controller.get_one_wallet);

apirouter.get("/get_onchain_address", controller_birkeland_payments.topup_wallet);
apirouter.get("/get_wallet_topup_tx",auth_birkeland_wallet_access, controller_birkeland_payments.get_wallet_topup_tx);
apirouter.get("/get_wallet_topup_tx_status",auth_birkeland_wallet_access, controller_birkeland_payments.get_wallet_topup_tx_status);



apirouter.get("/transactions",auth_birkeland_wallet_access, controller_birkeland_payments.transactions);
apirouter.post("/create_invoice",auth_birkeland_wallet_access, controller_birkeland_payments.create_invoice);
apirouter.post("/make_a_payment", auth_birkeland_wallet_access,controller_birkeland_payments.make_a_payment);
apirouter.get("/decode_lightning_invoice", controller_birkeland_payments.decode_lightning_invoice);


apirouter.post("/check_endpoint_is_authenticated",auth_birkeland_wallet_access, birkeland_wallet_controller.check_endpoint_is_authenticated);

apirouter.post("/withdraw_to_onchain_address",auth_birkeland_wallet_access, birkeland_wallet_controller.withdraw_to_onchain_address);



module.exports = apirouter;
