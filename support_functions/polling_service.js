const topup_birkeland_wallet_item = require("./../birkeland_controller/../birkeland_wallets/topup_birkeland_wallet_item");

const poll_and_update_on_chain_transaction = async () => {
  try {
    console.log("poll_and_update_on_chain_transaction")
    let filter = { transaction_confirmed: false };
    let resp = await topup_birkeland_wallet_item.find(filter);
    for (let count =0;count <resp.length; i++) {
        let filter_object = {
            chain_address : resp["chain_address"],
            public_key : resp["public_key"],
            wallet_id : resp["wallet_id"],
            user_id : resp["user_id"]
        }
        console.log(filter_object)

    }
    console.log("---------------------------------")
  } catch (err) {
    console.log(err);
  }
};

module.exports={poll_and_update_on_chain_transaction}
