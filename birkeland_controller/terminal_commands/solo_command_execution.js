const { exec } = require("child_process");

const AVAILABLE_OPERATIONS = {
    "START_LND" : 'start_lnd',
    "START_BTC" : 'start_btc',
    "STOP_LND" : 'stop_lnd',
    "STOP_BTC" : 'stop_btc',
    "CREATE_LND_WALLET" : 'create_lnd_wallet'
}

const get_command_for_operation = (operation) =>{
    var command = "";
    switch(operation){
        case AVAILABLE_OPERATIONS.START_BTC:
            command = "bitcoind --daemon";
            break;
        case AVAILABLE_OPERATIONS.START_LND:
            command = "nohup lnd &";
            break;
        case AVAILABLE_OPERATIONS.STOP_BTC:
            command = "pkill bitcoind";
            break;
        case AVAILABLE_OPERATIONS.STOP_LND:
            command = "pkill lnd";
            break;
        default:
            break;
    }
    return command;
}

const get_command_with_params_for_operation = (operation,params) =>{
    var command = "";
    switch(operation){
        case AVAILABLE_OPERATIONS.CREATE_LND_WALLET:
            let {password} =  params;
            command = `lncli create --nopassphrase`;
            console.log(command)
            break;
        default:
            break;
    }
    return command;
}

const execute_solo_command = (command_to_execute,res)=>{
   // let command_to_execute = get_command_for_operation(operation);
    console.log(`Current command executed ${command_to_execute}`);
    exec(command_to_execute, (error, stdout,stderr) =>{
        if(error){
            console.log(`error from ${error}`);
            return res.status(500).send({success : false});
        }
        if(stdout){
            console.log(`stdout from ${stdout}`);
        }
        if(stderr){
            console.log(`stderr from ${stderr}`);
        }
        return res.status(200).send({success : true});
    });
 
}

module.exports={execute_solo_command,get_command_with_params_for_operation,get_command_for_operation}