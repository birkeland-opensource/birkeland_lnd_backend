const express = require("express");
const apirouter = express.Router();

const btc_core_controller = require("./btc_core_controller");


apirouter.post("/btc_core_ops", btc_core_controller.btc_core_ops);

module.exports = apirouter;
