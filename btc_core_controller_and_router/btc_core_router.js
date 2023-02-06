var express = require("express");
var apirouter = express.Router();

var btc_core_controller = require("./btc_core_controller");


apirouter.post("/btc_core_ops", btc_core_controller.btc_core_ops);

module.exports = apirouter;
