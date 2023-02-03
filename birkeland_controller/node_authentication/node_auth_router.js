var express = require("express");
const { auth_birkeland_wallet_access, decode_node_auth_jwt_token } = require("../support_functions/utils");
var apirouter = express.Router();

var node_auth_controller = require("./node_auth_controller");

apirouter.post("/create_node_auth_password",node_auth_controller.create_node_auth_password);

apirouter.post("/get_node_auth_token",node_auth_controller.get_node_auth_token);

