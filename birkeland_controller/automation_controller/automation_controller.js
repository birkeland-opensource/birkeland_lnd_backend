const test_birkeland_lnd = require("test_birkeland_lnd");
const {add_peer_open_channel_command,
} = require("../../support_functions/automation_services");

const to_node_address =
  "02cfdc6b60e5931d174a342b20b50d6a2a17c6e4ef8e077ea54069a3541ad50eb0";
const to_socket = "52.89.237.109:9735";
const channel_capacity = 100000;

const iterator_operations = {
  connect_clearnet: "connect_clearnet",
};

const sample_request_object = {
  iterator_operation: iterator_operations?.connect_clearnet,
  params: {
    public_key: to_node_address, // req.body.public_key,
    socket: to_socket, //req.body.socket
    local_tokens: channel_capacity,
  },
};

// const command_list = [
//     {
//         params : {operation : LND_GRPC_OPERATION.ADD_PEER,socket : to_socket, public_key :to_node_address }, // {socket : req.body.socket, public_key :req.body.public_key },
//         status : "pending",
//         time_executed : "",
//         execution_response : {}
//     },
//     {
//         params : {operation : LND_GRPC_OPERATION.OPEN_CHANNEL ,local_tokens : channel_capacity, partner_public_key :to_node_address}, // {local_tokens : req.body.local_tokens, public_key :req.body.public_key },
//         status : "pending",
//         time_executed : "",
//         execution_response : {}
//     }
// ];
// Fix iterator 
//Add Switch cases for clubbed commands
const iterate_and_execute = async (command_list) => {
  for (var i = 0; i < command_list?.length; i++) {
    let command = command_list[i];
    try {
      let res = await test_birkeland_lnd.PerformAuthenticatedOperation(
        command.params
      );
      console.log("Raw execution response");
      console.log(res);
      console.log("End of raw execution response");
      if (res.success) {
        command.status = "success";
        command.time_executed = new Date();
        command.execution_response = res.message;
      } else {
        command.status = "failed";
        command.time_executed = new Date();
        command.execution_response = res.message;
      }
    } catch (err) {
      console.log(command_list);
      console.log(err);
      command.status = "failed";
      command.time_executed = new Date();
      command.execution_response = err;
    }
  }
  console.log(command_list);
};

exports.execute_iterative_operation = async (req, res) => {
  try {
    //sample request object
    // {    
    //     socket :socket,
    //    public_key:public_key,
    //   channel_capacity :channel_capacity
    // }
    console.log(req.body);
    let commands_resp = add_peer_open_channel_command(req.body);
    if (!commands_resp?.success) {
      return res.status(400).send({
        success: false,
        message: "Failed to generate commands. Please check the input data.",
      });
    }
    let resp = await iterate_and_execute(commands_resp?.commands);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};
