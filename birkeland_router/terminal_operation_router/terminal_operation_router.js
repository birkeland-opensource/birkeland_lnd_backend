

var express = require("express");
var apirouter = express.Router();

var terminal_controller = require("../../birkeland_controller/terminal_operation/terminal_controller")

apirouter.post("/can_execute_in_terminal", terminal_controller.can_execute_in_terminal);
apirouter.post("/check_btc", terminal_controller.check_btc_running);
apirouter.post("/check_node_monitor", terminal_controller.check_hw_monitor_running);
apirouter.post("/check_lnd", terminal_controller.check_lnd_running);
apirouter.post("/install_btc", terminal_controller.install_btc);
apirouter.post("/install_lnd", terminal_controller.install_lnd);
apirouter.post("/install_node_monitoring", terminal_controller.install_node_monitoring);

apirouter.post("/check_if_a_process_is_running", terminal_controller.check_if_a_process_is_running);

apirouter.post("/manage_a_process", terminal_controller.manage_a_process);

apirouter.post("/perform_lnd_operation", terminal_controller.perform_lnd_operation);

apirouter.post("/setup_encrypted_config_for_grpc",terminal_controller.execute_lnd_comm_config_command )






module.exports = apirouter;
