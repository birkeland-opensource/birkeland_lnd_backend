
const {execute_solo_command,get_command_with_params_for_operation,get_command_for_operation, AVAILABLE_OPERATIONS} = require("../terminal_commands/solo_command_execution");
const { execute_commands, available_operations, get_commands_with_password } = require("../terminal_commands/terminal_command_executor");
const exec = require('child_process').exec;
const base_path = process.cwd()

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
       // case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
       case 'darwin' : cmd = `pgrep ${query}`; break;
       // case 'linux' : cmd = `ps -A | grep ${query}`; break;
       case 'linux' : cmd = `pgrep ${query}`; break;
        default: break;
    }
    console.log(cmd)
    exec(cmd, (err, stdout, stderr) => {
        console.log('-----')
        //console.log(stdout)
        //console.log((stdout.length >0) ? true :false);
        cb((stdout.length >0) ? true :false);
        //cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
        console.log('-----')
    });
}

exports.perform_lnd_operation = async(req,res) =>{
    try{
        let {operation,ops_params} = req.body;
        let command = get_command_with_params_for_operation(operation,ops_params);
       execute_solo_command(command,res)
     
    }
    catch(e){
        console.log(e)
        return res.status(400).send({success : false});
    }
}

exports.manage_a_process = async(req,res) =>{
    try{

        let {operation} = req.body;
        if(operation == AVAILABLE_OPERATIONS.START_LND){
            console.log(`${base_path}/shell_scripts/start_lnd.sh`);
           // let rsp = execute_commands(`${base_path}/shell_scripts/start_lnd.sh`);
            exec(`${base_path}/shell_scripts/start_lnd.sh`, { env: process.env, cwd: process.cwd() }, (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  return res.status(500).send({success : false,message : error});
                }
              
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                return res.status(200).send({success : true, message : rsp});
              });

           
        }
        else{
            let command_to_execute = get_command_for_operation(operation);
            console.log(command_to_execute)
            execute_solo_command(command_to_execute,res);
        }
    
    }
    catch(e){
        return res.status(400).send({success : false});
    }
}
exports.check_if_a_process_is_running = async(req,res) => {
    try{
        let {process} = req.body;

        isRunning(process, (status) => {
            console.log(status); // true|false
            return res.status(200).send({success : true, message : {is_running: status}});
        })
       // return res.status(200).send({success : false, message : {is_running: false}});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.can_execute_in_terminal = async(req,res) =>{
    try{

        let cmds_to_exe = get_commands_with_password("","","",available_operations.CAN_EXECUTE_COMMAND_FROM_TERMINAL)
        let rsp = execute_commands(cmds_to_exe);

        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        console.log(err)
        return res.status(400).send({success : false});
    }
}

exports.check_btc_running = async(req,res) =>{
    try{
        let cmds_to_exe = get_commands_with_password("","","",available_operations.CHECK_BTC_IS_RUNNING)
        let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.check_hw_monitor_running = async(req,res) =>{
    try{
        let cmds_to_exe = get_commands_with_password("","","",available_operations.CHECK_NODE_MONITOR_IS_RUNNING)
        let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.check_lnd_running = async(req,res) =>{
    try{
        let cmds_to_exe = get_commands_with_password("","","",available_operations.CHECK_LND_IS_RUNNING)
        let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.install_btc = async(req,res) =>{
    try{
        let {password} = req.body;
        let cmds_to_exe = get_commands_with_password("username",password,"",available_operations.BTC_INSTALLATION_COMMANDS)
        console.log(cmds_to_exe)
        let rsp = execute_commands(cmds_to_exe);
        let conf_rsp = execute_commands(`${base_path}/shell_scripts/create_btc_config.sh`);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.update_birkeland_server = async(req,res) =>{
    try{
        let {password} = req.body;
        let cmds_to_exe = get_commands_with_password("username",password,"",available_operations.UPDATE_BIRKELAND_SERVER)
        console.log(cmds_to_exe)
        let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.execute_lnd_comm_config_command = async(req,res) =>{
    try{
        let {password} = req.body;
        let cmds_to_exe = get_commands_with_password("username",password,"",available_operations.CREATE_AND_SETUP_BIRKELAND_LND_COMM_CONFIG)
        let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.install_lnd = async(req,res) =>{
    try{
        console.log("install_lnd");
        console.log(req.body)
        let {password} = req.body;
        let cmds_to_exe = get_commands_with_password("username",password,"",available_operations.LND_INSTALLATION_COMMANDS)
        let rsp = execute_commands(cmds_to_exe);
        let conf_rsp = execute_commands(`${base_path}/shell_scripts/create_lnd_config.sh`);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        console.log(err)
        return res.status(400).send({success : false});
    }
}

exports.install_node_monitoring = async(req,res) =>{
    try{
        let { password,unique_node_id} = req.body;
        let cmds_to_exe = get_commands_with_password("username",password,unique_node_id,available_operations.HARDWARE_MONITORING_INSTALLATION_COMMANDS)
        let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : rsp});
    }
    catch(err){
        return res.status(400).send({success : false});
    }
}

exports.install_lnbits = async(req,res) =>{
    try{
        let { password} = req.body;
        let cmds_to_exe = get_commands_with_password("username",password,"",available_operations.LNBITS_INSTALLATION)
        //let rsp = execute_commands(cmds_to_exe);
        return res.status(200).send({success : true, message : "rsp"});
    }
    catch(err){
        return res.status(400).send({success : false});
    }  
}