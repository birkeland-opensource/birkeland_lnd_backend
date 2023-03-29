const { exec, spawn } = require('child_process');
const { Get_bitcoin_installation_command, Get_Hardware_Monitoring_Installation_Commands, Get_Lnd_Installation_Commands, Check_Can_Execute_From_Terminal, Check_Node_Monitor_Is_Running, Check_BTC_Is_Running, get_lnbits_installation_commands } = require('./installation_commands');
const { create_birkeland_lnd_comm_config_file } = require('./setup_config_files');
const base_path = process.cwd()

const available_operations = {
    "CAN_EXECUTE_COMMAND_FROM_TERMINAL" : 1,
    "HARDWARE_MONITORING_INSTALLATION_COMMANDS" : 2,
    "BTC_INSTALLATION_COMMANDS" : 3,
    "LND_INSTALLATION_COMMANDS" : 4,
    "CHECK_LND_IS_RUNNING" : 5,
    "CHECK_BTC_IS_RUNNING" : 6,
    "CHECK_NODE_MONITOR_IS_RUNNING" : 7,
    "CREATE_AND_SETUP_BIRKELAND_LND_COMM_CONFIG" : 8,
    "LNBITS_INSTALLATION" : 9,
    "UPDATE_BIRKELAND_SERVER" : 10
}


//FireBox, MultiSig wallet,Anchroga, zodiac, who are licenced and blockdaimond figment
const execute_commands = (command_file_path) =>{
        exec(`${command_file_path}`, (cmoderror,cmodstdout) =>{
            if(cmoderror){
                return;   
            }
            if(cmodstdout){
                return;
            }
            const child = spawn(command_file_path);
            child.stdout.on('data',(data) =>{
            });
            child.stderr.on('data',(data) =>{
            });
            child.on('error',(error) =>{
                
            });
            child.on('exit',(code) =>{
                if(code){
                    console.log(`exited with ${code}`)
                } 
            });
        });
}

const get_commands_with_password = (username,password,key_id,operations) =>{

    var commands = [];
    switch(operations) {
        case available_operations.BTC_INSTALLATION_COMMANDS:
            commands = `${base_path}/shell_scripts/install_btc.sh`
            //commands = Get_bitcoin_installation_command(password)
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
            commands = `${base_path}/shell_scripts/install_lnd.sh`
            //commands = Get_Lnd_Installation_Commands(password)
            // code block
            break;
    
        case available_operations.CREATE_AND_SETUP_BIRKELAND_LND_COMM_CONFIG:
            commands = `${base_path}/shell_scripts/setup_tls_and_macroon.sh`
            //commands = create_birkeland_lnd_comm_config_file(password)
            // code block
            break;
        
        case available_operations.LNBITS_INSTALLATION:
            commands = get_lnbits_installation_commands(password)
            // code block
            break;

        case available_operations.UPDATE_BIRKELAND_SERVER:
            commands = `${base_path}/shell_scripts/update_birkeland_server.sh`
            // code block
            break;

        default:
            break;
          // code block
      }

    return commands;
}

module.exports={available_operations,execute_commands,get_commands_with_password}
