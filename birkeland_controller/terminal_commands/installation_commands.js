
const fs = require('fs')
const os = require('os');


console.log("Get_Hardware_Monitoring_Installation_Commands")
const base_path = process.cwd()
const sys_os = os.type();
console.log("OS " +sys_os );

exports.get_lnbits_installation_commands = (password) => {
	
	const cmds = `#!/bin/bash \n\n` +
				`echo "Installing LNBits" \n`+
				`pwd \n`+
				`sudo -v \n`+
				`cd ~ \n`+
				`mkdir -p birkeland/lnbits \n`+
				`cd birkeland/lnbits \n`+
				`git clone https://github.com/lnbits/lnbits-legend.git \n`+
				`cd lnbits-legend/ \n`+
				`sudo apt install software-properties-common \n`+
				`sudo add-apt-repository ppa:deadsnakes/ppa	\n`+
				`sudo apt install python3.9 python3.9-distutils \n`+
				`curl -sSL https://install.python-poetry.org | python3 - \n`+
				`export PATH="/home/user/.local/bin:$PATH"  \n`+
				`poetry env use python3.9 \n`+
				`poetry install --only main\n`+
				`mkdir data \n` +
				`cp .env.example .env \n` +
				`nano .env \n`+
				`exit`
			
			var filepath =	base_path+'/lnbits_installation.sh'
			fs.writeFileSync(filepath, cmds);

			return filepath;
}


exports.Get_bitcoin_installation_command = (passowrd) =>{
		const cmds = `#!/bin/bash \n\n`+
		`pwd \n`+
		`echo "${passowrd}" | sudo -S apt-get update \n`
		`echo "${passowrd}" | sudo -S apt-get install git \n`+
		`mkdir -p ~/code && cd ~/code \n`+
		`cd ~/code && git clone https://github.com/bitcoin/bitcoin.git \n`+
		`echo "${passowrd}" | sudo -S apt-get install build-essential libtool autotools-dev automake -y pkg-config bsdmainutils python3 libevent-dev \n`+
		`echo "${passowrd}" | sudo -S apt-get install libboost-system-dev libboost-filesystem-dev libboost-test-dev libboost-thread-dev -y \n`+
		`echo "${passowrd}" | sudo -S apt-get install libsqlite3-dev -y \n` +
		`echo "${passowrd}" | sudo -S apt-get install libminiupnpc-dev -y \n`+
		`echo "${passowrd}" | sudo -S apt-get install libzmq3-dev -y \n`+
		`echo "${passowrd}" | sudo -S apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools -y \n`+
		`echo "${passowrd}" | sudo -S apt-get install libqrencode-dev -y \n`+
		`cd ~/code/bitcoin && ./contrib/install_db4.sh pwd \n`+
		`cd ~/code/bitcoin && git checkout tags/v0.23.0 \n`+
		`cd ~/code/bitcoin && ./autogen.sh \n`+
		`export BDB_PREFIX='/home/${USER}/code/bitcoin/db4' \n`+
		`cd ~/code/bitcoin && ./configure BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include" \n`+
		`cd ~/code/bitcoin && make \n` +
		`echo "${passowrd}" | sudo make install \n` +
		`bitcoin-qt & \n` +
		`exit`
		var filepath =	base_path+'/btc_installation.sh'

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

exports.Get_Hardware_Monitoring_Installation_Commands = (password,key_id) =>{
	
    const commands_linux = `#!/bin/bash \n\n`+
		`pwd \n`+
		`echo "${password}" | sudo apt-get install zip unzip -y \n`+
		`cd ~/ \n`+
		`mkdir -p birkeland && cd birkeland \n` +
		`rm -rf node_monitor \n`+
		`mkdir node_monitor && cd node_monitor \n`+
		`wget https://birkeland.sgp1.digitaloceanspaces.com/BL_HWMPY0001.zip \n`+
		`unzip BL_HWMPY0001.zip \n`+
		`cd BL_HWMPY0001 \n`+
		`chmod +x BL_HWMPY001 \n`+
		`json='{"process_to_monitor": ["chrome","umbrell"], "key_id" :"${key_id}"}' \n`+
		`echo " + "$json" + "> config.json \n` +
		`./BL_HWMPY001 & \n`+
		`exit`

	const commands_mac = `#!/bin/bash \n\n`+
		`pwd \n`+
		`cd ~/ \n`+
		`mkdir -p birkeland && cd birkeland \n` +
		`rm -rf node_monitor \n`+
		`mkdir node_monitor && cd node_monitor \n`+
		`wget https://birkeland.sgp1.digitaloceanspaces.com/BL_HWMPY0001.zip \n`+
		`unzip BL_HWMPY0001.zip \n`+
		`cd BL_HWMPY0001 \n`+
		`chmod +x BL_HWMPY001 \n`+
		`json='{"process_to_monitor": ["chrome","umbrell"], "key_id" :"${key_id}"}' \n`+
		`echo "$json" > config.json \n` +
		`./BL_HWMPY001 & \n`+
		`exit`
	
	var filepath =	base_path+'/hw_monitor_integration.sh'

	if(sys_os == 'Darwin'){
		console.log("It is Darwin")
		fs.writeFileSync(filepath, commands_mac);
	}
	else if(sys_os == 'Linux'){
		console.log("It is linux")
		fs.writeFileSync(filepath, commands_linux);
	}
	else{
		console.log("Still using linux")
		fs.writeFileSync(filepath, commands_linux);
	}

	return filepath;

}

exports.Get_Lnd_Installation_Commands =(password) =>{
	const cmds = `#!/bin/bash \n\n`+
		`pwd \n` +
		`cd ~/ \n` +
		`echo "${password}" | sudo -S sudo apt install golang -y \n`+
		`mkdir -p birkeland && cd birkeland \n` +
		`mkdir -p code && cd code \n`+
		`echo "${password}" | sudo -S rm -rf lnd_code \n`+
		`mkdir -p lnd_code && cd lnd_code \n`+
		`git clone https://github.com/lightningnetwork/lnd \n`+
		`cd lnd && git checkout tags/v0.15.5-beta -b tags/v0.15.5-beta \n`+
		`make install \n`+
		`exit`
    

	var filepath =	base_path+'/lnd_installation.sh'

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

exports.Check_Can_Execute_From_Terminal = (username)=> {
	const cmds = `#!/bin/bash \n\n`+`echo "Hello From Birkeland Mr ${username}"` 

	var filepath =	base_path+'/test_terminal.sh'

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


exports.Get_Check_Lnd_Is_Running_Commands = () =>{

    const cmds = `#!/bin/bash \n\n`+
		`echo "will check if LND is running" \n`+
		`exit`
    

		var filepath =	base_path+'/check_lnd_running.sh'

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


exports.Check_Node_Monitor_Is_Running = (password) =>{

	const cmds =`#!/bin/bash \n\n`+
		`echo "will check if Node Monitor is running" \n`+
		`exit`

	var filepath =	base_path+'/check_node_monitor_running.sh'

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

exports.Check_BTC_Is_Running = (password) =>{

	const cmds = `#!/bin/bash \n\n`+
		`echo "will check if BTC is running" \n`+
		`exit`

	var filepath =	base_path+'/check_btc_running.sh'

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

