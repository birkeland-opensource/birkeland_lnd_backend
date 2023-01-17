const topup_birkeland_wallet_item = require("./../birkeland_controller/../birkeland_wallets/topup_birkeland_wallet_item");

const poll_and_update_on_chain_transaction = async () => {
  try {
    console.log("poll_and_update_on_chain_transaction")
    let filter = { transaction_confirmed: false };
    let resp = await topup_birkeland_wallet_item.find(filter);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

module.exports={poll_and_update_on_chain_transaction}
