

const express = require("express");
const apirouter = express.Router();

const terminal_controller = require("../../birkeland_controller/terminal_operation/terminal_controller");
const { decode_node_auth_jwt_token } = require("../../support_functions/utils");

apirouter.post("/update_birkeland_server",decode_node_auth_jwt_token,  terminal_controller.update_birkeland_server);

apirouter.post("/update_lnd_config",decode_node_auth_jwt_token, terminal_controller.update_lnd_config);
apirouter.post("/restore_lnd_config",decode_node_auth_jwt_token, terminal_controller.restore_lnd_config);

apirouter.post("/manage_a_process", decode_node_auth_jwt_token, terminal_controller.manage_a_process);
apirouter.post("/setup_encrypted_config_for_grpc", decode_node_auth_jwt_token, terminal_controller.execute_lnd_comm_config_command )

module.exports = apirouter;
