

const express = require("express");
const apirouter = express.Router();

const terminal_controller = require("../../birkeland_controller/terminal_operation/terminal_controller");
const { decode_node_auth_jwt_token } = require("../../support_functions/utils");

apirouter.post("/can_execute_in_terminal", terminal_controller.can_execute_in_terminal);

apirouter.post("/check_node_monitor",  terminal_controller.check_hw_monitor_running);
apirouter.post("/check_lnd",  terminal_controller.check_lnd_running);
apirouter.post("/install_btc",  terminal_controller.install_btc);
apirouter.post("/update_birkeland_server",  terminal_controller.update_birkeland_server);
apirouter.post("/install_lnd",  terminal_controller.install_lnd);
apirouter.post("/install_node_monitoring",  terminal_controller.install_node_monitoring);
apirouter.post("/update_lnd_config",decode_node_auth_jwt_token, terminal_controller.update_lnd_config);
apirouter.post("/restore_lnd_config",decode_node_auth_jwt_token, terminal_controller.restore_lnd_config);

apirouter.post("/manage_a_process",  terminal_controller.manage_a_process);
apirouter.post("/setup_encrypted_config_for_grpc", decode_node_auth_jwt_token, terminal_controller.execute_lnd_comm_config_command )

module.exports = apirouter;
