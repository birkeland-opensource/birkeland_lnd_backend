const { exec, spawn } = require('child_process');
const { Get_bitcoin_installation_command, Get_Hardware_Monitoring_Installation_Commands, Get_Lnd_Installation_Commands, Check_Can_Execute_From_Terminal, Check_Node_Monitor_Is_Running, Check_BTC_Is_Running } = require('./installation_commands');
const { create_birkeland_lnd_comm_config_file } = require('./setup_config_files');


const available_operations = {
    "CAN_EXECUTE_COMMAND_FROM_TERMINAL" : 1,
    "HARDWARE_MONITORING_INSTALLATION_COMMANDS" : 2,
    "BTC_INSTALLATION_COMMANDS" : 3,
    "LND_INSTALLATION_COMMANDS" : 4,
    "CHECK_LND_IS_RUNNING" : 5,
    "CHECK_BTC_IS_RUNNING" : 6,
    "CHECK_NODE_MONITOR_IS_RUNNING" : 7,
    "CREATE_AND_SETUP_BIRKELAND_LND_COMM_CONFIG" : 8
}
const remove_the_file = (path) => {
    if(path.length > 2)
    {
       exec(`rm -rf ${path}`, (error,stdout, stderr) =>{
           console.log("Attempting to remove shell script")
           if(error){
               console.log(first)
           }
           if(stdout){
               console.log(stdout);
           }
           if(stderr){
               console.log(stderr);
           }
       });
    }
}

//FireBox, MultiSig wallet,Anchroga, zodiac, who are licenced and blockdaimond figment
const execute_commands = (command_file_path) =>{
        exec(`chmod +x ${command_file_path}`, (cmoderror,cmodstdout) =>{
            if(cmoderror){
                console.log(`error: ${cmoderror.message}`);
                console.log("returning from cmoderror");
                remove_the_file(command_file_path);
                return;   
            }
            if(cmodstdout){
                console.log(`error: ${cmodstdout}`);
                console.log("returning from cmodstdout");
                remove_the_file(command_file_path);
                return;
            }
            const child = spawn(command_file_path);
            child.stdout.on('data',(data) =>{
                console.log(`stdout: ${data}`)
            });
            child.stderr.on('data',(data) =>{
                console.log(`stderr: ${data}`)
            });
            child.on('error',(error) =>{
                remove_the_file(command_file_path);
                console.log(`error: ${error.message}`);
            });
            child.on('exit',(code) =>{
                remove_the_file(command_file_path);
                console.log("We exit here")
                if(code){
                    console.log(`Process exit with code: ${code}`);
                } 
            });
        });
}

const get_commands_with_password = (username,password,key_id,operations) =>{

    console.log("function call  made")
    var commands = [];
    switch(operations) {
        case available_operations.BTC_INSTALLATION_COMMANDS:
            commands = Get_bitcoin_installation_command(password)
          // code block
          break;
        case available_operations.CAN_EXECUTE_COMMAND_FROM_TERMINAL:
            commands = Check_Can_Execute_From_Terminal(username)
          // code block
          break;

        case available_operations.CHECK_BTC_IS_RUNNING:
            commands = Check_BTC_Is_Running()
        // code block
        break;

        case available_operations.CHECK_LND_IS_RUNNING:
            commands = Get_Check_Lnd_Is_Running_Commands()
            // code block
            break;

        case available_operations.CHECK_NODE_MONITOR_IS_RUNNING:
            commands = Check_Node_Monitor_Is_Running()
            // code block
            break;

        case available_operations.HARDWARE_MONITORING_INSTALLATION_COMMANDS:
            commands = Get_Hardware_Monitoring_Installation_Commands(password,key_id)
            // code block
            break;

        case available_operations.LND_INSTALLATION_COMMANDS:
            commands = Get_Lnd_Installation_Commands(password)
            // code block
            break;
    
        case available_operations.CREATE_AND_SETUP_BIRKELAND_LND_COMM_CONFIG:
            console.log("CREATE_AND_SETUP_BIRKELAND_LND_COMM_CONFIG")
            commands = create_birkeland_lnd_comm_config_file(password)
            // code block
            break;

        default:
          // code block
      }

    return commands;
}

module.exports={available_operations,execute_commands,get_commands_with_password}
