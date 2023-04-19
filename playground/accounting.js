const test_birkeland_lnd = require('test_birkeland_lnd')
const axios = require('axios');
const fs = require('fs');
const { parse } = require('json2csv');
const { get_forwads_and_return_unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens, get_forwads_and_return_unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens, merge_with_incoming, merge_with_outgoing } = require('../birkeland_controller/data_controller/data_controller');

async function main() {
  try {
    let unique_channel_ids = [];
    let unique_channel_with_tx_info = [];
    let unique_incoming_outgoin_channels_and_frequencies = {};
    let total_fee_earned_mtokens = 0;
    let channel_ids_tx_id_fee = [];
    let channel_ids_tx_id_fee_tx_fee = []
    let unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens= [];
    let unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens= [];
    
    const channelsResult = await test_birkeland_lnd.PerformAuthenticatedOperation({ operation: 'get_channels' });
    const chain_transactions = await test_birkeland_lnd.PerformAuthenticatedOperation({ operation: 'get_chain_transactions' });
    const closed_channels = await test_birkeland_lnd.PerformAuthenticatedOperation({ operation: 'get_closed_channels' });



    if (channelsResult?.success) {
     // console.log(JSON.stringify(channelsResult?.message?.channels))
     console.log(channelsResult?.message?.channels?.length)
      unique_channel_ids =channelsResult?.message?.channels;

      for (var i=0 ; i<unique_channel_ids.length; i++) {     
       const channelsResult = await test_birkeland_lnd.PerformAuthenticatedOperation({ operation: 'get_channel', channel_id: unique_channel_ids[i]?.id });
       unique_channel_ids[i].policies = channelsResult?.message?.policies;
       // unique_channel_with_tx_info.push(channelsResult?.message);
      }

      for (var i=0 ; i<unique_channel_ids.length; i++) {   
        unique_channel_ids[i].transaction_fee= await get_on_chain_transaction_fee(unique_channel_ids[i]?.transaction_id);
       }
  
       console.log(unique_channel_ids);

      //  const unique_channel_ids_csv = parse(unique_channel_ids);
      //  fs.writeFileSync('unique_channel_ids_csv.csv', unique_channel_ids_csv);
    }

    const forwardsResult = await test_birkeland_lnd.PerformAuthenticatedOperation({ operation: 'get_forwards', limit: 2000 });

    if (forwardsResult?.success) {
      // const forwards_csv = parse(forwardsResult.message?.forwards);
      // fs.writeFileSync('forwards_csv.csv', forwards_csv);

      unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens = get_forwads_and_return_unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens(forwardsResult.message?.forwards);
      unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens = get_forwads_and_return_unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens(forwardsResult.message?.forwards);

    


      let merged_with_incoming = merge_with_incoming(unique_channel_ids,unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens);

      

      let merged_with_outgoing = merge_with_outgoing(merged_with_incoming,unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens);

      console.log("-----------------")

      console.log(merged_with_outgoing);

      // const unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens_csv = parse(unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens);
      // const unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens_csv = parse(unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens);
      // fs.writeFileSync('unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens_csv.csv', unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens_csv);
      // fs.writeFileSync('unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens_csv.csv', unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens_csv);
    }

  } catch (err) {
    console.log(err);
  }
}

main();








const merge_with_outgoing_data = (array1, array2) =>{
  const result = [];

  array1.forEach((item1) => {
    const foundItem = array2.find((item2) => item1.id === item2.outgoing_unique_channel_id);

    if (foundItem) {
      result.push({
        id: item1.id,
        transaction_id: item1.transaction_id,
        fee_outgoing_mtokens: item1.fee_mtokens,
        transaction_fee_sats: item1.transaction_fee,
        total_outgoing_mtokens_processed: foundItem.total_mtokens_processed,
        total_fee_mtokens: foundItem.total_fee_mtokens,
      });
    }
  });

  return result;
}

const merge_with_incoming_data = (array1, array2) =>{
  const result = [];

  array1.forEach((item1) => {
    const foundItem = array2.find((item2) => item1.id === item2.incoming_unique_channel_id);

    if (foundItem) {
      result.push({
        id: item1.id,
        transaction_id: item1.transaction_id,
        fee_incoming_mtokens: item1.fee_mtokens,
        transaction_fee_sats: item1.transaction_fee,
        total_incoming_mtokens_processed: foundItem.total_mtokens_processed,
        total_fee_mtokens: foundItem.total_fee_mtokens,
      });
    }
  });

  return result;
}














function get_forwads_and_return_unique_channel_id_total_mtokens_processed_total_fee_mtokens(transactions) {
  const channelSummary = {};

  transactions.forEach(transaction => {
    const { incoming_channel, outgoing_channel, mtokens, fee_mtokens } = transaction;

    if (!channelSummary[incoming_channel]) {
      channelSummary[incoming_channel] = { total_mtokens: 0, total_fee_mtokens: 0 };
    }
    if (!channelSummary[outgoing_channel]) {
      channelSummary[outgoing_channel] = { total_mtokens: 0, total_fee_mtokens: 0 };
    }

    channelSummary[incoming_channel].total_mtokens += Number(mtokens);
    channelSummary[incoming_channel].total_fee_mtokens += Number(fee_mtokens);

    channelSummary[outgoing_channel].total_mtokens += Number(mtokens);
    channelSummary[outgoing_channel].total_fee_mtokens += Number(fee_mtokens);
  });

  const result = [];

  for (const channelId in channelSummary) {
    result.push({
      unique_channel_id: channelId,
      total_mtokens_processed: channelSummary[channelId].total_mtokens,
      total_fee_mtokens: channelSummary[channelId].total_fee_mtokens
    });
  }

  return result;
}



function return_channel_ids_tx_id_fee(jsonArray) {
  const result = [];

  jsonArray.forEach(element => {
    const id = element.id;

    const transaction_id = element.transaction_id;
    try{
    const fee_mtokens = element.policies.reduce((sum, policy) => {
      return sum + parseInt(policy.base_fee_mtokens);
    }, 0);

    result.push({ id, transaction_id, fee_mtokens });
  }catch(err){}
  });

  return result;
}



function get_unique_incoming_outgoin_channels_and_frequencies(array) {
    const result = {
      unique_incoming_channel: [],
      unique_outgoing_channel: [],
      incoming_channel_frequency: {},
      outgoing_channel_frequency: {},
    };
  
    array.forEach(item => {
      // Process incoming_channel
      if (!result.unique_incoming_channel.includes(item.incoming_channel)) {
        result.unique_incoming_channel.push(item.incoming_channel);
        result.incoming_channel_frequency[item.incoming_channel] = 1;
      } else {
        result.incoming_channel_frequency[item.incoming_channel]++;
      }
  
      // Process outgoing_channel
      if (!result.unique_outgoing_channel.includes(item.outgoing_channel)) {
        result.unique_outgoing_channel.push(item.outgoing_channel);
        result.outgoing_channel_frequency[item.outgoing_channel] = 1;
      } else {
        result.outgoing_channel_frequency[item.outgoing_channel]++;
      }
    });
  
    return result;
  }



function calculate_total_fee_earned_mtokens(array) {
  let totalFeeMTokens = 0;
  
  array.forEach(item => {
    totalFeeMTokens += parseInt(item.fee_mtokens);
  });

  return totalFeeMTokens;
}