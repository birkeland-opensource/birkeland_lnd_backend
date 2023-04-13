

const express = require("express");
const apirouter = express.Router();

const automation_controller = require("./automation_controller");
const { decode_node_auth_jwt_token } = require("../../support_functions/utils");
const { rebalance_lnd_channel } = require("./reblance_controller");

apirouter.post("/execute_iterative_operation",  automation_controller.execute_iterative_operation);
apirouter.post("/rebalance_lnd_channel",  rebalance_lnd_channel);

module.exports = apirouter;
