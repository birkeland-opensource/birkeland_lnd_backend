const express = require("express");
const { decode_node_auth_jwt_token } = require("../support_functions/utils");
const apirouter = express.Router();

const btc_core_controller = require("./btc_core_controller");


apirouter.post("/btc_core_ops",decode_node_auth_jwt_token, btc_core_controller.btc_core_ops);

module.exports = apirouter;
