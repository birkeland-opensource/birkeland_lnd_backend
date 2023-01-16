var express = require("express");
var apirouter = express.Router();

var unauthenticated_lnd_operation = require("./../birkeland_controller/lnd_grpc_operation/unauthenticated_operations");
var combined_lnd_grpc_operation = require("./../birkeland_controller/lnd_grpc_operation/combined_lnd_grpc_operation");

const { auth_lnd_ops } = require("../birkeland_controller/birkeland_lnd_controller");
const { unauth_lnd_ops } = require("../birkeland_controller/test_unauthenticated_birkeland_lnd");

apirouter.post("/auth_lnd_ops", auth_lnd_ops);

//apirouter.post("/unauth_lnd_ops", unauthenticated_lnd_operation.PerformUnAuthenticatedOperation);

apirouter.post("/unauth_lnd_ops", unauth_lnd_ops);


apirouter.get("/get_lnd_dashboard_info", combined_lnd_grpc_operation.get_dashboard_info_from_birkeland_lnd);

module.exports = apirouter;
