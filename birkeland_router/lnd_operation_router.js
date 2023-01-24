var express = require("express");
var apirouter = express.Router();

var combined_lnd_grpc_operation = require("./../birkeland_controller/lnd_grpc_operation/combined_lnd_grpc_operation");

const { auth_lnd_ops } = require("../birkeland_controller/birkeland_lnd_controller");
const { unauth_lnd_ops } = require("../birkeland_controller/unauthenticated_birkeland_lnd_controller");
const { get_node_auth_token, check_endpoint_is_authenticated } = require("../birkeland_controller/node_authentication/node_auth_controller");
const { decode_node_auth_jwt_token } = require("../support_functions/utils");

apirouter.post("/auth_lnd_ops", auth_lnd_ops);
apirouter.post("/unauth_lnd_ops", unauth_lnd_ops);

apirouter.post("/get_node_auth_token", get_node_auth_token);

apirouter.post("/check_endpoint_is_authenticated",decode_node_auth_jwt_token, check_endpoint_is_authenticated);



apirouter.get("/get_lnd_dashboard_info", combined_lnd_grpc_operation.get_dashboard_info_from_birkeland_lnd);

module.exports = apirouter;
