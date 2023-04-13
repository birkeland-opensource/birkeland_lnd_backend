const { exec } = require('child_process');

exports.rebalance_lnd_channel = async (req, res) => {

    try{
        let {out_public_key, in_public_key, amount,max_fee,max_fee_rate,time_in_mins} = req.body;
        await rebalanceChannelAsync(out_public_key, in_public_key, amount,max_fee,max_fee_rate,time_in_mins)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({ success: false, message: err });
    }
}



const rebalanceChannelAsync = (out_public_key, in_public_key, amount,max_fee, max_fee_rate,time_in_mins) => {
  //const command = `bos rebalance --from ${fromChannel} --to ${toChannel} --amount ${amount}`;
  const command_cid = `bos rebalance --amount ${amount} --out ${out_public_key} --in ${in_public_key} --max-fee ${max_fee} --max-fee-rate ${max_fee_rate} --minutes ${time_in_mins}`;
  return new Promise((resolve, reject) => {
    exec(command_cid, (error, stdout, stderr) => {
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


