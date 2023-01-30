const birkeland_payment_transaction_item = require("./birkeland_payment_transaction_item");
const topup_birkeland_wallet_item = require("./topup_birkeland_wallet_item");
const birkeland_wallet_item = require("./birkeland_wallet_item_model");
const invoice = require("@node-lightning/invoice");
const test_birkeland_lnd = require("test_birkeland_lnd");

const { v4: uuidv4 } = require("uuid");
const {
  BIRKELAND_WALLET_TRANSACTION_STATUS,
  BIRKELAND_WALLET_TRANSACTION_INTENT,
} = require("../support_functions/constants");
const { LND_GRPC_OPERATION } = require("test_birkeland_lnd/operations");
const {
  get_wallet_top_tx_status,
} = require("../support_functions/polling_service");
const { get_node_public_key } = require("../support_functions/utils");
const birkeland_wallet_transaction_item = require("./birkeland_payment_transaction_item");

exports.withdraw_from_wallet = async (req, res) => {
  try {
    let { wallet_id, user_id } = req.query;
      var public_key_resp = await get_node_public_key(res);
      if (public_key_resp?.success) {
        global.node_public_key = public_key_resp?.public_key;
        if (global.node_public_key) {
          let send_to_chain_address_resp =
          await test_birkeland_lnd.PerformAuthenticatedOperation({
            operation: LND_GRPC_OPERATION.SEND_TO_CHAIN_ADDRESS,
          });
          if (send_to_chain_address_resp["success"]) {
            let address_message = send_to_chain_address_resp["message"];
          }
        }
        else {
        return res
          .status(500)
          .send({ success: false, message: "LND may not be running" });
      }
      }

  }
  catch(err){

  }
}

exports.topup_wallet = async (req, res) => {
  try {
    let { wallet_id, user_id } = req.query;
    // 1. Create on chain address
    // 2. get the chain_address,public_key,wallet_id,date_created,last_udapted,tokens,transaction_confirmed,confirmation_count
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      if (global.node_public_key) {
        let create_chain_address_resp =
          await test_birkeland_lnd.PerformAuthenticatedOperation({
            operation: LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS,
          });

        if (create_chain_address_resp["success"]) {
          let address_message = create_chain_address_resp["message"];
          let wallet_topup_item = {
            chain_address: address_message["address"],
            public_key: global.node_public_key,
            wallet_id: wallet_id,
            date_created: new Date(),
            last_udapted: new Date(),
            tokens: 0,
            transaction_confirmed: false,
            confirmation_count: 0,
            user_id: user_id,
          };

          await topup_birkeland_wallet_item.create(wallet_topup_item);
          return res.status(200).send({
            success: true,
            message: { chain_address: address_message["address"] },
          });
        } else {
          return res
            .status(400)
            .send({ success: false, message: "LND may not be running" });
        }
      } else {
        return res
          .status(500)
          .send({ success: false, message: "LND may not be running" });
      }
    }
  } catch (err) {
    return res.status(400).send({ success: false, message: err });
  }
};

exports.get_wallet_topup_tx = async (req, res) => {
  try {
    let {  wallet_id, user_id } = req.query;
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      if (global.node_public_key) {
        let filter = {
          public_key: global.node_public_key,
          wallet_id: wallet_id,
          user_id: user_id,
        };
        let result = (await topup_birkeland_wallet_item.find(filter)).reverse();
        return res.status(200).send({ success: true, message: result });
      } else {
        return res.status(500).send({
          success: false,
          message: "Lightning node maynot be running",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

exports.get_wallet_topup_tx_status = async (req, res) => {
  try {
    var { wallet_id, user_id } = req.query;
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      if (global.node_public_key) {
        var filter = {
          public_key: global.node_public_key,
          wallet_id: wallet_id,
          user_id: user_id,
          transaction_confirmed: false,
        };
        var result = await topup_birkeland_wallet_item.find(filter);
        if (result.length > 0) {
          let utxos = await test_birkeland_lnd.PerformAuthenticatedOperation({
            operation: LND_GRPC_OPERATION.GET_U_TXOS,
            min_confirmations: 3,
          });
          if (utxos["success"]) {
            let update_object = get_wallet_top_tx_status(
              result,
              utxos["message"]
            );
            if (update_object["success"]) {
              var filtered_update_object = {
                last_udapted: new Date(),
                transaction_id: update_object["message"]["transaction_id"],
                confirmation_count:
                  update_object["message"]["confirmation_count"],
                tokens: update_object["message"]["tokens"],
                transaction_confirmed: true,
              };
              let update_filter = filter;
              update_filter["chain_address"] = update_object["message"]["address"];
            
              await topup_birkeland_wallet_item.findOneAndUpdate(
                update_filter,
                filtered_update_object
              );

              if (filtered_update_object["tokens"] > 0) {
                // Update wallet balance
                let wallet_filter = {
                  main_wallet_public_key: global.node_public_key,
                  wallet_id: wallet_id,
                  user_id: user_id,
                };
                let wallet_balance = await birkeland_wallet_item.findOne(
                  wallet_filter
                );
                let total_wallet_balance_msats =
                  wallet_balance["wallet_balance_in_mstats"] +
                  filtered_update_object["tokens"] * 1000;
                let wallet_update_item = {
                  wallet_balance_in_mstats: total_wallet_balance_msats,
                  last_udapted: new Date(),
                };

                await birkeland_wallet_item.findOneAndUpdate(
                  wallet_filter,
                  wallet_update_item
                );
              }

              return res.status(200).send({ success: true });
            } else {
              return res.status(500).send({
                success: false,
                message: "No topup transactions found",
              });
            }
          } else {
            return res
              .status(500)
              .send({ success: false, message: "UTXO not found" });
          }
        } else {
          return res
            .status(400)
            .send({ success: false, message: "No wallet topup txs found" });
        }
      } else {
        return res.status(500).send({
          success: false,
          message: "Lightning node maynot be running",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

exports.transactions = async (req, res) => {
  try {
    // Query the database with from_wallet_id to get alltransactions
    try {
      let { wallet_id, user_id } = req.query;
      var public_key_resp = await get_node_public_key(res);
      if (public_key_resp?.success) {
        global.node_public_key = public_key_resp?.public_key;
        if (global.node_public_key) {
          let filter = {
            public_key: global.node_public_key,
            wallet_id: wallet_id,
            user_id: user_id,
          };
          let result = await birkeland_payment_transaction_item.find(filter);
          return res.status(200).send({ success: true, message: result });
        } else {
          return res.status(500).send({
            success: false,
            message: "Lightning node maynot be running",
          });
        }
      }
    } catch (err) {
      return res.status(400).send({ success: false });
    }
  } catch (err) {}
};
exports.create_invoice = async (req, res) => {
  try {
    var {wallet_id, user_id} = req.query;
    var { memo, sats } = req.body;
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      if (global.node_public_key) {
        let birkeland_payment_transaction_item_object = {
          memo: memo,
          user_id: user_id,
          amount_in_msats: sats * 1000,
          public_key: global.node_public_key,
          wallet_id: wallet_id,
          date_created: new Date(),
          date_updated: new Date(),
          payment_satus: BIRKELAND_WALLET_TRANSACTION_STATUS.CREATED,
          intent: BIRKELAND_WALLET_TRANSACTION_INTENT.RECEIVE,
        };

        if (birkeland_payment_transaction_item_object["amount_in_msats"] > 0) {
          let create_invoice_params = {
            operation: "create_invoice",
            mtokens:
              birkeland_payment_transaction_item_object["amount_in_msats"],
            description: global.node_public_key,
          };

          let create_invoice_resp =
            await test_birkeland_lnd.PerformAuthenticatedOperation(
              create_invoice_params
            );
          if (create_invoice_resp["success"]) {
            birkeland_payment_transaction_item_object["transaction_id"] =
              create_invoice_resp["message"]["id"];
            birkeland_payment_transaction_item_object["payment_request_hash"] =
              create_invoice_resp["message"]["request"];
            await birkeland_payment_transaction_item.create(
              birkeland_payment_transaction_item_object
            );
            return res
              .status(200)
              .send({ success: true, message: create_invoice_resp });
          } else {
            return res.status(500).send({
              success: false,
              message: "Lightning node maynot be running",
            });
          }
        } else {
          return res.status(400).send({
            success: false,
            message: "amount cannot be zero or less than zero",
          });
        }
      } else {
        return res.status(500).send({
          success: false,
          message: "Lightning node maynot be running",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false });
  }
};

exports.make_a_payment = async (req, res) => {
  try {
    var {user_id, wallet_id,} = req.query;
    var {  request_hash } = req.body;
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      console.log(global.node_public_key);
      if (global.node_public_key) {
        var decoded_request_hash = invoice.decode(request_hash);
        var from_node_public_key = decoded_request_hash?.desc;
        const node_public_key = global.node_public_key;
        if (node_public_key === from_node_public_key) {
          var transaction_filter = {
            payment_request_hash: request_hash,
          };
          var transact_object = await birkeland_payment_transaction_item.find(
            transaction_filter
          );

          if (transact_object.length == 1) {
            //1. check if there is sufficient balance in the payment sender account
            var wallet_filter = {
              wallet_id: wallet_id,
              user_id: user_id,
            };
            var user_wallet_info = await birkeland_wallet_item.find(
              wallet_filter
            );
            if (
              user_wallet_info[0]["wallet_balance_in_mstats"] >
              decoded_request_hash?.valueMsat
            ) {
              //2. if so upadte the satus of the invoice creator
              //3. insert the transaction satus in the sender
              let birkeland_payment_transaction_item_object = {
                payment_request_hash: request_hash,
                transaction_id: uuidv4(),
                memo: transact_object[0]?.memo,
                user_id: user_id,
                amount_in_msats: decoded_request_hash?.valueMsat,
                public_key: node_public_key,
                wallet_id: wallet_id,
                date_created: new Date(),
                date_updated: new Date(),
                payment_satus: BIRKELAND_WALLET_TRANSACTION_STATUS.SUCCESS,
                intent: BIRKELAND_WALLET_TRANSACTION_INTENT.SEND,
              };
              await birkeland_payment_transaction_item.findOneAndUpdate(
                transaction_filter,
                { payment_satus: BIRKELAND_WALLET_TRANSACTION_STATUS.SUCCESS }
              );
              await birkeland_payment_transaction_item.create(
                birkeland_payment_transaction_item_object
              );
              let updated_walled_balance_sender =
                user_wallet_info[0]["wallet_balance_in_mstats"] -
                decoded_request_hash?.valueMsat;
              await birkeland_wallet_item.findOneAndUpdate(wallet_filter, {
                wallet_balance_in_mstats: updated_walled_balance_sender,
              });
              let receiver_wallet_filter = {
                user_id: transact_object[0]["user_id"],
                wallet_id: transact_object[0]["wallet_id"],
              };
              let receiver_wallet_current_satus =
                await birkeland_wallet_item.find(receiver_wallet_filter);
              let updated_balance =
                parseInt(decoded_request_hash?.valueMsat) +
                parseInt(
                  receiver_wallet_current_satus[0]["wallet_balance_in_mstats"]
                );
              await birkeland_wallet_item.findOneAndUpdate(
                receiver_wallet_filter,
                {
                  wallet_balance_in_mstats: updated_balance,
                  last_udapted: new Date(),
                }
              );
            }
          } else {
            return res.status(400).send({
              success: false,
              message: "Error processing this create new payment request",
            });
          }
        } else {
          return res.status(400).send({
            success: false,
            message: "Error processing this create new payment request",
          });
        }
        return res
          .status(200)
          .send({ success: true, message: "Payment Success" });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Public key not availabe" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false });
  }
};

exports.decode_lightning_invoice = async (req, res) => {
  try {
    let { payment_hash } = req.query;
    let result = invoice.decode(payment_hash);

    let decoded_invoice = {
      value_in_sat: result?.valueSat,
      pubkey: result?.pubkey,
      inv_payment_hash: result?.paymentHash,
      expiry: result?.expiry,
      payee_node: result?.payeeNode,
      description: result?.desc,
      description: result?.shortDesc,
    };
    return res.status(200).send({ success: true, message: decoded_invoice });
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};


exports.withdraw_to_onchain_address = async (req, res) => {
  try {
    var public_key_resp = await get_node_public_key(res);
    if (public_key_resp?.success) {
      global.node_public_key = public_key_resp?.public_key;
      if (global.node_public_key) {
        var { user_id, wallet_id } = req.query;
        var { tokens, address } = req.body;
        var filter = {
          user_id: user_id,
          wallet_id: wallet_id,
        };
        var tokens_int = parseInt(tokens);
        if (tokens_int > 1 && address.length > 3) {
          var birkeland_wallet_info = await birkeland_wallet_item.findOne(
            filter
          );
          //console.log(result)
          var wallet_balance =
            birkeland_wallet_info["wallet_balance_in_mstats"] / 1000;
          console.log(`${tokens_int} < ${wallet_balance}`);
          if (tokens_int < wallet_balance) {
            var withdraw_amount_in_usd = await satoshisToFiat(
              tokens_int,
              "USD"
            );
            console.log(withdraw_amount_in_usd);
            if (withdraw_amount_in_usd > 2.2) {
              //1. make request to lnd
              let on_chain_withdraw_params = {
                operation: "send_to_chain_address",
                tokens: tokens_int,
                address: address,
              };
              let on_chain_withdraw_repsonse =
                await test_birkeland_lnd.PerformAuthenticatedOperation(
                  on_chain_withdraw_params
                );
              if (on_chain_withdraw_repsonse["success"]) {
                //2. if the request is success subsctract from the wallet
                var updated_balance = wallet_balance - tokens_int;
                let updatd_object = {
                  last_udapted: new Date(),
                  wallet_balance_in_mstats: updated_balance * 1000,
                };
                
                await birkeland_wallet_item.findOneAndUpdate(
                  filter,
                  updatd_object
                );
                console.log(on_chain_withdraw_repsonse["message"]);
                var withdraw_transaction_object = {
                  transaction_id : on_chain_withdraw_repsonse["message"]["id"],
                  memo: `Withdraw to chain address ${address}`,
                  payment_request_hash : uuidv4(),
                  wallet_id: wallet_id,
                  user_id: user_id,
                  amount_in_msats: tokens_int * 1000,
                  public_key: global.node_public_key,
                  date_created: new Date(),
                  intent: BIRKELAND_WALLET_TRANSACTION_INTENT.WITHDRAW,
                  date_updated: new Date(),
                  payment_satus: BIRKELAND_WALLET_TRANSACTION_STATUS.SUCCESS,
                };
                
                await birkeland_wallet_transaction_item.create(
                  withdraw_transaction_object
                );
                return res
                  .status(200)
                  .send({ success: true, message: on_chain_withdraw_repsonse });
              } else {
                return res
                  .status(500)
                  .send({
                    success: false,
                    message: on_chain_withdraw_repsonse["message"],
                  });
              }
            } else {
              return res
                .status(500)
                .send({
                  success: false,
                  message: "Minimum Sats to withdraw is 3$ or more",
                });
            }
          } else {
            return res
              .status(500)
              .send({ success: false, message: "Insufficient balance" });
          }
        }
      } else{
        return res
            .status(500)
            .send({ success: false, message: "Node may not be running" });
      }
    } 
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, message : err });
  }
};