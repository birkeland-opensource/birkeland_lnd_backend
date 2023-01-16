var express = require("express");
var apirouter = express.Router();

var combined_lnd_grpc_operation = require("./../birkeland_controller/lnd_grpc_operation/combined_lnd_grpc_operation");

const { auth_lnd_ops } = require("../birkeland_controller/birkeland_lnd_controller");
const { unauth_lnd_ops } = require("../birkeland_controller/unauthenticated_birkeland_lnd_controller");

apirouter.post("/auth_lnd_ops", auth_lnd_ops);
apirouter.post("/unauth_lnd_ops", unauth_lnd_ops);

apirouter.get("/get_lnd_dashboard_info", combined_lnd_grpc_operation.get_dashboard_info_from_birkeland_lnd);

module.exports = apirouter;
