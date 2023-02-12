var express = require("express");
const { auth_birkeland_wallet_access, decode_node_auth_jwt_token } = require("../support_functions/utils");
var apirouter = express.Router();

var birkeland_wallet_controller = require("./controller");
var controller_birkeland_payments = require("./controller_birkeland_payments");

//1
apirouter.post("/wallet", decode_node_auth_jwt_token,birkeland_wallet_controller.create_a_wallet);
//apirouter.get("/wallets",decode_node_auth_jwt_token, birkeland_wallet_controller.get_all_wallets);

//2
apirouter.get("/wallets_by_user_id",decode_node_auth_jwt_token, birkeland_wallet_controller.get_all_wallets_by_user_id);

//3
apirouter.get("/wallet",auth_birkeland_wallet_access, birkeland_wallet_controller.get_one_wallet);

//4
apirouter.get("/wallet_by_auth_token",decode_node_auth_jwt_token, birkeland_wallet_controller.get_one_wallet);

//5
apirouter.get("/all_transactions",decode_node_auth_jwt_token, controller_birkeland_payments.all_transactions);

//6
apirouter.get("/get_onchain_address", controller_birkeland_payments.topup_wallet);

//7
apirouter.get("/get_wallet_topup_tx",auth_birkeland_wallet_access, controller_birkeland_payments.get_wallet_topup_tx);

//8
apirouter.get("/get_wallet_topup_tx_status",auth_birkeland_wallet_access, controller_birkeland_payments.get_wallet_topup_tx_status);

//9
apirouter.post("/withdraw_to_onchain_address",auth_birkeland_wallet_access, controller_birkeland_payments.withdraw_to_onchain_address);

//10
apirouter.get("/transactions",auth_birkeland_wallet_access, controller_birkeland_payments.transactions);

//11
apirouter.post("/create_invoice",auth_birkeland_wallet_access, controller_birkeland_payments.create_invoice);

//12
apirouter.post("/make_a_payment", auth_birkeland_wallet_access,controller_birkeland_payments.make_a_payment);

//13
apirouter.get("/decode_lightning_invoice", controller_birkeland_payments.decode_lightning_invoice);


apirouter.get("/update_on_chain_tx",auth_birkeland_wallet_access,controller_birkeland_payments.update_on_chain_tx);

apirouter.post("/check_endpoint_is_authenticated",auth_birkeland_wallet_access, birkeland_wallet_controller.check_endpoint_is_authenticated);

apirouter.post("/make_birkeland_wallet_payment",auth_birkeland_wallet_access, controller_birkeland_payments.make_birkeland_wallet_payment);




module.exports = apirouter;
