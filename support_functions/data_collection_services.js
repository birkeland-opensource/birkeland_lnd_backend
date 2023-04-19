const axios = require('axios');



const merge_with_incoming = (arr1,arr2) =>{

    for(var i=0;i<arr1?.length;i++){
        for(var j=0;j<arr2?.length;j++){
            if(arr1[i]?.id == arr2[j]?.incoming_unique_channel_id){
            arr1[i].incoming_info = arr2[j];
            }
        }
    }
    return arr1;

}
  

const merge_with_outgoing = (arr1, arr2) => {

    for(var i=0;i<arr1?.length;i++){
        for(var j=0;j<arr2?.length;j++){
            if(arr1[i]?.id == arr2[j]?.outgoing_unique_channel_id){
            arr1[i].outgoing_info = arr2[j];
            }
        }
    }
    return arr1;

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