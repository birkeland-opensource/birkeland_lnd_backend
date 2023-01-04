const fs = require('fs')
const os = require('os');

const base_path = process.cwd()
const sys_os = os.type();

const create_birkeland_lnd_comm_config_file = (password) =>{
    const cmds = `#!/bin/bash \n\n`+
		`pwd \n`+
		`echo "${password}" | sudo -S mkdir -p /etc/birkeland \n` +
        `echo "${password}" | sudo -S base64 -w0 ~/.lnd/tls.cert > tlscert \n` +
        `echo "${password}" | sudo -S base64 -w0 ~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon > btc_admin_macroon \n` +
		`echo "${password}" | sudo -S mv tlscert /etc/birkeland/ \n` +
		`echo "${password}" | sudo -S mv btc_admin_macroon /etc/birkeland/ \n` +
        `exit`
		
        var filepath =	base_path+'/birkeland_lnd_config_file_setup.sh'

        if(sys_os == 'Darwin'){
			console.log("It is Darwin")
			fs.writeFileSync(filepath, cmds);
		}
		else if(sys_os == 'Linux'){
			console.log("It is linux")
			fs.writeFileSync(filepath, cmds);
		}
		else{
			console.log("Still using linux")
			fs.writeFileSync(filepath, cmds);
		}
        
        return filepath;
}

module.exports = {create_birkeland_lnd_comm_config_file}