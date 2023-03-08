const { LND_GRPC_OPERATION } = require("test_birkeland_lnd/operations");
const {PerformAuthenticatedOperation} = require("test_birkeland_lnd");
const topup_birkeland_wallet_item = require("./../birkeland_controller/../birkeland_wallets/topup_birkeland_wallet_item");

const poll_and_update_on_chain_transaction = async () => {
  try {
    let filter = { transaction_confirmed: false };
    
    let birkeland_wallet_topup_tx = await topup_birkeland_wallet_item.find(filter);
    let utxos = await PerformAuthenticatedOperation({operation : LND_GRPC_OPERATION.GET_U_TXOS});
 
   
  } catch (err) {
  }
};

const get_wallet_top_tx_status = (result, utxos) =>{
  var lnd_utxos = utxos["utxos"];
  for (var i = 0; i < result.length; i++) {
    var chain_address = result[i]["chain_address"];
  for(var count = 0; count < lnd_utxos.length; count++){
    if(chain_address === lnd_utxos[count]["address"])
    {
      let update_object = lnd_utxos[count]
      update_object["_id"] = result[i]?._id;
      return {success : true,message : update_object}
    }
  }
}
  return {success : false}
}


var address = "bc1qvzmhseaffdayz9vpjuqjnhyvv4qvjgsal00l5q"
var utxos = [
  {
    "address": "bc1qvzmhseaffdayz9vpjuqjnhyvv4qvjgsal00l5q",
    "address_format": "p2wpkh",
    "confirmation_count": 8,
    "output_script": "001460b77867a94b7a411581970129dc8c6540c9221d",
    "tokens": 19701,
    "transaction_id": "a0238c87e18d8fa051e95282b55093242501c63f50f9ecf0265d9ee1df7094a5",
    "transaction_vout": 0
  },
  {
    "address": "bc1qmuyemc2l53jjexhw7ny5pa24hmxfs2mn4y9lse",
    "address_format": "p2wpkh",
    "confirmation_count": 1692,
    "output_script": "0014df099de15fa4652c9aeef4c940f555becc982b73",
    "tokens": 50000,
    "transaction_id": "3f3f4938fada906eeb50499fe0cb13c83b5ba6c9592e5dafc921bae6b8aa60e7",
    "transaction_vout": 0
  },
  {
    "address": "bc1p8enheuk6l8qh33dexaactux440llpx50t4eyppxem0qy65kj39jslftx7m",
    "address_format": "p2tr",
    "confirmation_count": 1694,
    "output_script": "51203e677cf2daf9c178c5b9377b85f0d5abfff09a8f5d724084d9dbc04d52d28965",
    "tokens": 2444,
    "transaction_id": "e889d78e01ec451dd6c91b70ebabfadd9708d9662318ef108e971920d36dfd22",
    "transaction_vout": 1
  },
  {
    "address": "bc1pujc9nt6xlacwarmnwqwq0fnctz2673p28sewwdydswk00e3ykf8qgpaf86",
    "address_format": "p2tr",
    "confirmation_count": 1694,
    "output_script": "5120e4b059af46ff70ee8f73701c07a6785895af442a3c32e7348d83acf7e624b24e",
    "tokens": 1304,
    "transaction_id": "c8f7ff38d7e55350e9b6c5cdc131546273f18b7afc076d1fc57128d86c99ede3",
    "transaction_vout": 1
  },
  {
    "address": "bc1pgm6rqrzrlcltnz600nl420g2rvwmxt4qatektwp5gxpqsuxq2wls56ye48",
    "address_format": "p2tr",
    "confirmation_count": 1698,
    "output_script": "512046f4300c43fe3eb98b4f7cff553d0a1b1db32ea0eaf365b83441820870c053bf",
    "tokens": 5255,
    "transaction_id": "c4ed41bf1552a0a22124815336d9b144d651c7ba483295f1a9be82c81f52430b",
    "transaction_vout": 1
  },
  {
    "address": "bc1pd6y9nq8tyt4rdz5mld747g0regdqdwj22u2edtnrus2eyr5w5c6s927cwa",
    "address_format": "p2tr",
    "confirmation_count": 1699,
    "output_script": "51206e885980eb22ea368a9bfb7d5f21e3ca1a06ba4a571596ae63e415920e8ea635",
    "tokens": 2948,
    "transaction_id": "3fe8592320b7af19bbfc0cca1c4822705f89cb36fa6612a81a3a81e1dffcbbeb",
    "transaction_vout": 0
  },
  {
    "address": "bc1ptg25q6qw3e2hv6xpyxn59tucw7qhgmu7zs9ts0phz6aqr6jvqesq2xsxlc",
    "address_format": "p2tr",
    "confirmation_count": 1700,
    "output_script": "51205a1540680e8e557668c121a742af987781746f9e140ab83c3716ba01ea4c0660",
    "tokens": 5199,
    "transaction_id": "061bc6024060d46d75ec5ce59ef8b63a957bcf458126de23dfef7531a52da8e6",
    "transaction_vout": 1
  }
]

const get_wallet_update_tx = (chain_address, utxos) =>{
  return utxos.filter(utxo => utxo.address === chain_address);
}

get_wallet_update_tx(address, utxos)

module.exports={get_wallet_update_tx,poll_and_update_on_chain_transaction,get_wallet_top_tx_status}