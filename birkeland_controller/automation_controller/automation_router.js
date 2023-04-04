

const express = require("express");
const apirouter = express.Router();

const automation_controller = require("./automation_controller");
const { decode_node_auth_jwt_token } = require("../../support_functions/utils");

apirouter.post("/execute_iterative_operation",  automation_controller.execute_iterative_operation);

module.exports = apirouter;
