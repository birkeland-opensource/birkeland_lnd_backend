const test_birkeland_lnd = require("test_birkeland_lnd");
const {
  get_on_chain_transaction_fee, get_forwads_and_return_unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens, get_forwads_and_return_unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens, merge_with_incoming, merge_with_outgoing,
} = require("../../support_functions/data_collection_services");

const get_channels_accounting_info = async () => {
  try {

    let unique_channel_ids = [];
    let unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens =
      [];
    let unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens =
      [];

    const channelsResult =
      await test_birkeland_lnd.PerformAuthenticatedOperation({
        operation: "get_channels",
      });

    if (channelsResult?.success) {
      unique_channel_ids = channelsResult?.message?.channels;

      for (var i = 0; i < unique_channel_ids.length; i++) {
        const channelsResult =
          await test_birkeland_lnd.PerformAuthenticatedOperation({
            operation: "get_channel",
            channel_id: unique_channel_ids[i]?.id,
          });
        unique_channel_ids[i].policies = channelsResult?.message?.policies;
      }

      for (var i = 0; i < unique_channel_ids.length; i++) {
        unique_channel_ids[i].transaction_fee =
          await get_on_chain_transaction_fee(
            unique_channel_ids[i]?.transaction_id
          );
      }
    }
    else{
        return new Error("Error getting channels")
    }


    // Create a new Date object
    // const after_date_main = new Date(after_date);
    // const before_date_main = new Date(before_date);
    // console.log(after_date_main.toISOString());
    // console.log(before_date_main.toISOString());

    const forwardsResult =
      await test_birkeland_lnd.PerformAuthenticatedOperation({
        // after :  after_date_main.toISOString(),
        // before :before_date_main.toISOString(),
        operation: "get_forwards",
        limit: 10000,
      });

    if (forwardsResult?.success) {
        console.log( forwardsResult.message?.forwards);
      unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens =
        get_forwads_and_return_unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens(
          forwardsResult.message?.forwards
        );
      unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens =
        get_forwads_and_return_unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens(
          forwardsResult.message?.forwards
        );

      let merged_with_incoming = merge_with_incoming(
        unique_channel_ids,
        unique_incoming_channel_id_total_mtokens_processed_total_fee_mtokens
      );

      let merged_with_outgoing = merge_with_outgoing(
        merged_with_incoming,
        unique_outgoing_channel_id_total_mtokens_processed_total_fee_mtokens
      );

      return merged_with_outgoing;
    }
    else{
        return new Error("Error getting forwards")
    }
  } catch (err) {
    console.log(err)
    throw new Error(err?.message);
  }
};

exports.get_aacounting_info = async(req,res) =>{
    try{
        let message = await get_channels_accounting_info();
        return res.status(200).send({success:true, message : message})
    }
    catch(err){
        return res.status(500).send({ success: false, message: err });
    }
}

