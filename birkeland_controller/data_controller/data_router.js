
const express = require("express");
const apirouter = express.Router();

const data_controller = require("./data_controller");
const { decode_node_auth_jwt_token } = require("../../support_functions/utils");

apirouter.get("/get_accounting_info",  data_controller.get_aacounting_info);
apirouter.get("/get_forwards",  data_controller.get_forwards);

module.exports = apirouter;