const { LND_GRPC_OPERATION } = require("test_birkeland_lnd/operations");

const add_peer_open_channel_command = (params) => {
  let { socket, public_key, channel_capacity } = params;
  if (!socket || !public_key || !channel_capacity) {
    return { success: true, commands: command_list };
  }
  let command_list = [
    {
      params: {
        operation: LND_GRPC_OPERATION.ADD_PEER,
        socket: socket,
        public_key: public_key,
      }, // {socket : req.body.socket, public_key :req.body.public_key },
      status: "pending",
      time_executed: "",
      execution_response: {},
    },
    {
      params: {
        operation: LND_GRPC_OPERATION.OPEN_CHANNEL,
        local_tokens: channel_capacity,
        partner_public_key: public_key,
      }, // {local_tokens : req.body.local_tokens, public_key :req.body.public_key },
      status: "pending",
      time_executed: "",
      execution_response: {},
    },
  ];
  return { success: true, commands: command_list };
};


module.exports = {add_peer_open_channel_command}