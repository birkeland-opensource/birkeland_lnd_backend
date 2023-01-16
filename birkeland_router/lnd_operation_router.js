var express = require("express");
var apirouter = express.Router();

var authenticated_lnd_operation = require("./../birkeland_controller/lnd_grpc_operation/authenticated_operations");

var unauthenticated_lnd_operation = require("./../birkeland_controller/lnd_grpc_operation/unauthenticated_operations");

var combined_lnd_grpc_operation = require("./../birkeland_controller/lnd_grpc_operation/combined_lnd_grpc_operation");
const { auth_lnd_ops } = require("../birkeland_controller/test_birkeland_lnd_controller");


//apirouter.post("/auth_lnd_ops", authenticated_lnd_operation.perform_authenticated_operation_api);

apirouter.post("/auth_lnd_ops", auth_lnd_ops);


apirouter.post("/test_birkeland_auth_lnd_ops", auth_lnd_ops);

apirouter.post("/unauth_lnd_ops", unauthenticated_lnd_operation.PerformUnAuthenticatedOperation);

//http://localhost:9990/terminal/setup_encrypted_config_for_grpc
apirouter.get("/get_lnd_dashboard_info", combined_lnd_grpc_operation.get_lnd_dashboard_info);
module.exports = apirouter;
