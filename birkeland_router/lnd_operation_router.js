var express = require("express");
var apirouter = express.Router();

var authenticated_lnd_operation = require("./../birkeland_controller/lnd_grpc_operation/authenticated_operations");

var unauthenticated_lnd_operation = require("./../birkeland_controller/lnd_grpc_operation/unauthenticated_operations");


apirouter.get("/auth_lnd_ops", authenticated_lnd_operation.PerformAuthenticatedOperation);

apirouter.get("/unauth_lnd_ops", unauthenticated_lnd_operation.PerformUnAuthenticatedOperation);

module.exports = apirouter;
