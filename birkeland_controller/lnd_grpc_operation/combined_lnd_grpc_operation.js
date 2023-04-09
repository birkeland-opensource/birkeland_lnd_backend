
const birkeland_lnd_custom_macaroon = require('birkeland_lnd_custom_macaroon')

exports.get_dashboard_info_from_birkeland_lnd = async(req,res) =>{

  try{
    console.log({operation : "get_chain_balance",macaroon :req.headers["macaroon"]})
    let chain_balance = await birkeland_lnd_custom_macaroon.PerformAuthenticatedOperation({operation : "get_chain_balance",macaroon :req.headers["macaroon"]});
      let channel_balance = await birkeland_lnd_custom_macaroon.PerformAuthenticatedOperation({operation : "get_channel_balance",macaroon :req.headers["macaroon"]});
      let wallet_info = await birkeland_lnd_custom_macaroon.PerformAuthenticatedOperation({operation : "get_wallet_info",macaroon :req.headers["macaroon"]});
      let wallet_version = await birkeland_lnd_custom_macaroon.PerformAuthenticatedOperation({operation : "get_wallet_version",macaroon :req.headers["macaroon"]});
      let dash_board_info_object = {
        "chain_balance" :chain_balance,
        "channel_balance" :channel_balance,
        "wallet_info" :wallet_info,
        "wallet_version" :wallet_version
      }

      return res.status(200).send({ success: true, message: dash_board_info_object });

  }catch(err){
    return res.status(500).send({ success: false, message: err });
  }

}
