const express = require("express");
//const { decode_node_auth_jwt_token } = require("../support_functions/utils");
const apirouter = express.Router();

const birkeland_lnd_events_controller = require("./birkeland_lnd_events_controller");


apirouter.get("/get_event_data", birkeland_lnd_events_controller.get_event_info);
apirouter.get("/get_event_info_of_operation", birkeland_lnd_events_controller.get_event_info_of_operation);
apirouter.get("/get_lnd_event_list", birkeland_lnd_events_controller.get_lnd_event_list);
apirouter.get("/get_event_info_by_operation", birkeland_lnd_events_controller.get_event_info_by_operation);

module.exports = apirouter;
