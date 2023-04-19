const axios = require('axios');


const merge_with_incoming =(arr1, arr2) =>{
    let merge_with_incoming = [];
     arr1.forEach(item1 => {
      arr2.forEach(item2 => {
      if(item1.id == item2.incoming_unique_channel_id){
        item1.incoming_info = item2
        merge_with_incoming.push(item1);
      }
      });
    });
    return merge_with_incoming;
  }
  
  
  const merge_with_outgoing = (arr1, arr2) => {
    let merge_with_outgoing = [];
     arr1.forEach(item1 => {
      arr2.forEach(item2 => {
      console.log(item1.id)
      console.log(item2)
      if(item1.id == item2.outgoing_unique_channel_id){
        item1.outgoing_info = item2
        merge_with_outgoing.push(item1);
      }
      });
    });
    return merge_with_outgoing;
  }
  
  
  const get_on_chain_transaction_fee = async  (transactionId) => {
    try {
      const response = await axios.get(`https://blockchain.info/rawtx/${transactionId}`);
      const transactionData = response.data;
  
      const inputAmount = transactionData.inputs.reduce((sum, input) => sum + input.prev_out.value, 0);
      const outputAmount = transactionData.out.reduce((sum, output) => sum + output.value, 0);
      const transactionFee = inputAmount - outputAmount;
  
      return transactionFee;
    } catch (error) {
      console.error(`Error fetching transaction data: ${error.message}`);
      return null;
    }
  }
  
  
  const get_forwads_and_return_unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens = (transactions) =>{
    const channelSummary = {};
  
    transactions.forEach(transaction => {
      const { incoming_channel, mtokens, fee_mtokens } = transaction;
  
      if (!channelSummary[incoming_channel]) {
        channelSummary[incoming_channel] = { total_mtokens: 0, total_fee_mtokens: 0 };
      }
  
      channelSummary[incoming_channel].total_mtokens += Number(mtokens);
      channelSummary[incoming_channel].total_fee_mtokens += Number(fee_mtokens);
    });
  
    const result = [];
  
    for (const channelId in channelSummary) {
      result.push({
        incoming_unique_channel_id: channelId,
        incoming_total_mtokens_processed: channelSummary[channelId].total_mtokens,
        incoming_total_fee_mtokens: channelSummary[channelId].total_fee_mtokens
      });
    }
  
    return result;
  }
  
  const get_forwads_and_return_unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens = (transactions) => {
    const channelSummary = {};
  
    transactions.forEach(transaction => {
      const { outgoing_channel, mtokens, fee_mtokens } = transaction;
  
      if (!channelSummary[outgoing_channel]) {
        channelSummary[outgoing_channel] = { total_mtokens: 0, total_fee_mtokens: 0 };
      }
  
      channelSummary[outgoing_channel].total_mtokens += Number(mtokens);
      channelSummary[outgoing_channel].total_fee_mtokens += Number(fee_mtokens);
    });
  
    const result = [];
  
    for (const channelId in channelSummary) {
      result.push({
        outgoing_unique_channel_id: channelId,
        total_mtokens_processed: channelSummary[channelId].total_mtokens,
        total_fee_mtokens: channelSummary[channelId].total_fee_mtokens
      });
    }
  
    return result;
  }
  
  module.exports ={merge_with_outgoing,get_on_chain_transaction_fee,merge_with_incoming, get_forwads_and_return_unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens, get_forwads_and_return_unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens,}