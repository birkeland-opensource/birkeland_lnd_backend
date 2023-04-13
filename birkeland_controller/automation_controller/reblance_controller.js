const { exec } = require('child_process');

exports.rebalance_lnd_channel = async (req, res) => {

    try{
        let {fromChannel, toChannel, amount} = req.body;
        await rebalanceChannelAsync(fromChannel,toChannel,amount)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({ success: false, message: err });
    }
}



const rebalanceChannelAsync = (fromChannel, toChannel, amount) => {
  const command = `bos rebalance --from ${fromChannel} --to ${toChannel} --amount ${amount}`;
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      
      if (stderr) {
        reject(new Error(`Error: ${stderr}`));
        return;
      }
      
      resolve(stdout);
    });
  });
}





const rebalanceChannel = (fromChannel, toChannel, amount)  => {

  const command = `bos rebalance --from ${fromChannel} --to ${toChannel} --amount ${amount}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    
    console.log(`Rebalance successful: ${stdout}`);
  });
}


