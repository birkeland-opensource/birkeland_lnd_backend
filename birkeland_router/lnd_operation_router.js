var express = require("express");
var apirouter = express.Router();

var authenticated_lnd_operation = require("./../birkeland_controller/lnd_grpc_operation/authenticated_operations");

apirouter.get("/auth_lnd_ops", authenticated_lnd_operation.PerformAuthenticatedOperation);

module.exports = apirouter;
