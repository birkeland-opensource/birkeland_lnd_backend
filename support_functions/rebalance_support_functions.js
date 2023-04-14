
const split_by_balance_ratio = (data_to_analyze) =>{
    let excess_inbound_list = [];
    let excess_outbound_list = [];
data_to_analyze.filter(channel => {
    const partner_public_key = channel.partner_public_key;
    const channel_id = channel.id;
    const localBalance = channel.local_balance;
    const remoteBalance = channel.remote_balance;
    const balance_ratio = localBalance/remoteBalance;
    
    if(balance_ratio >1){
      const excess_outbound = {
        "partner_public_key" :partner_public_key,
        "channel_id" : channel_id,
        "outbound_liquidity" : localBalance,
        "inbound_liquidity" : remoteBalance,
        "amount_to_send" : Math.round(((localBalance + remoteBalance)/2) -remoteBalance),
        "amount_to_rebalance" :  Math.round(((localBalance + remoteBalance)/2) -remoteBalance)
      }
      excess_outbound_list.push(excess_outbound);
    }
    else{
      const excess_inbound = {
        "partner_public_key" :partner_public_key,
        "channel_id" : channel_id,
        "outbound_liquidity" : localBalance,
        "inbound_liquidity" : remoteBalance,
        "amount_to_receive" :   Math.round(((localBalance + remoteBalance)/2) -localBalance),
        "amount_to_rebalance" : Math.round(((localBalance + remoteBalance)/2) -localBalance)    
    }
    excess_inbound_list.push(excess_inbound);
  }
    const totalBalance = localBalance + remoteBalance;
    const balanceRatio = Math.min(localBalance, remoteBalance) / totalBalance;
    return balanceRatio < 0.4 || balanceRatio > 0.6; // Define what you consider to be unbalanced
  });
  return [excess_inbound_list, excess_outbound_list]
  
}

const sort_by_amount_to_rebalance = (pairs) => {
    return pairs.sort((a, b) => a.amount_to_rebalance - b.amount_to_rebalance);
  }


  const find_rebalance_pairs = (excess_inbound, excess_outbound) => {

    // Initialize an array to store the closest pairs
    const closest_pairs = [];
    
    // Iterate through the excess inbound array to find the closest pairs
    for (let i = 0; i < excess_inbound.length; i++) {
      const inbound = excess_inbound[i];
      let smallest_difference = Infinity;
      let closest_outbound = null;
      
      // Iterate through the excess outbound array to find the closest channel
      for (let j = 0; j < excess_outbound.length; j++) {
        const outbound = excess_outbound[j];
        const difference = Math.abs(inbound.amount_to_receive - outbound.amount_to_send);
        if (difference < smallest_difference) {
          smallest_difference = difference;
          closest_outbound = outbound;
        }
      }
      
      // If a closest outbound channel is found, add the pair to the closest pairs array
      if (closest_outbound !== null) {
        closest_pairs.push({ inbound, outbound: closest_outbound });
        // Remove the closest outbound channel from the excess outbound array to avoid selecting it again
        excess_outbound = excess_outbound.filter(c => c.channel_id !== closest_outbound.channel_id);
      }
    }
    
    // Return the closest pairs array
    return closest_pairs;
  }

  const generate_reblance_commands = (pairs_to_rebalance) => {
  
    console.log(pairs_to_rebalance)
    let commands_to_run = [];
   for (const pair of pairs_to_rebalance) {
     const amount = Math.round((pair?.inbound?.amount_to_rebalance + pair?.outbound?.amount_to_rebalance)/2);
     const out_public_key = pair?.outbound?.partner_public_key;
     const in_public_key = pair?.inbound?.partner_public_key;
     const max_fee = Math.round(amount * .005);
     const max_fee_rate = max_fee;
     const time_in_mins = 5;
    // console.log(pair)
     const command_cid = `bos rebalance --amount ${amount} --out ${out_public_key} --in ${in_public_key} --max-fee ${max_fee} --max-fee-rate ${max_fee_rate} --minutes ${time_in_mins}`;
     commands_to_run.push(command_cid);
   }
   return commands_to_run;
   
 }
module.exports={split_by_balance_ratio,sort_by_amount_to_rebalance,find_rebalance_pairs,generate_reblance_commands}