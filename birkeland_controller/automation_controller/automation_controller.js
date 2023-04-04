const test_birkeland_lnd = require('test_birkeland_lnd');
const { LND_GRPC_OPERATION } = require('test_birkeland_lnd/operations');


const to_node_address = "031038101cf7d8402958f2a9846d3549c92afc12d8b26732f6442702a80d1337ad";
const to_socket = "4.193.237.11:9735";
const channel_capacity = 100000;

const iterator_operations = {
    "connect_clearnet" : "connect_clearnet",
}

const sample_request_object = {
    iterator_operation : iterator_operations?.connect_clearnet,
    params : {
        public_key : to_node_address, // req.body.public_key,
        socket : to_socket, //req.body.socket
        "local_tokens": channel_capacity,
    }
}


const command_list = [
    {
        params : {operation : LND_GRPC_OPERATION.ADD_PEER,socket : to_socket, public_key :to_node_address }, // {socket : req.body.socket, public_key :req.body.public_key },
        status : "pending",
        time_executed : "",
        execution_response : {}
    },
    {
        params : {operation : LND_GRPC_OPERATION.ADD_PEER,local_tokens : channel_capacity, public_key :to_node_address}, // {local_tokens : req.body.local_tokens, public_key :req.body.public_key },
        status : "pending",
        time_executed : "",
        execution_response : {}
    }
];


const iterate_and_execute = async (command_list) =>{

    for(var i = 0; i < command_list?.length; i++){
        let command = command_list[i]; 
        try{
            let res = await test_birkeland_lnd.PerformAuthenticatedOperation(command.params);
            console.log("Raw execution response");
            console.log(res);
            console.log("End of raw execution response")
        if(res.success){
            command.status = "success";
            command.time_executed = new Date();
            command.execution_response = res.message;
        }
        else{
            command.status = "failed";
            command.time_executed = new Date();
            command.execution_response = res.message;
        }
        }
        catch (err) {
            console.log(command_list)
            console.log(err)
            command.status = "failed";
            command.time_executed = new Date();
            command.execution_response = err;
        }      
    }
    console.log(command_list)
}

const generate_command_list = (iterative_request_object) =>{


}

exports.execute_iterative_operation = async (req,res) => {

    try{
        //let command_list = generate_command_list(req.body?.iterative_request_object);

        let resp = await iterate_and_execute(command_list);
        return res.status(200).send({ success: true, message: resp });
    }
    catch(err){
        return res.status(500).send({ success: false, message: err });
    }
}


// execute_iterative_operation()
//     .then(() => {
//         console.log("Iterative operation executed successfully.");
//     })
//     .catch((error) => {
//         console.error("An error occurred during the iterative operation execution:", error);
//     });



