
const { BTC_CORE_OPERATIONS } = require("../support_functions/constants");
const { BTCCoreOperations } = require("./BTCCoreOperations");

const btcCoreOperations = new BTCCoreOperations();

const PerformBtcCoreOperations = async(params) =>{
    let { operation } = params;

    switch (operation) {
        case BTC_CORE_OPERATIONS.CREATE_BTC_WALLET:
            let create_btc_Wallet = btcCoreOperations.create_wallet(params);
            return create_btc_Wallet;
        
        case BTC_CORE_OPERATIONS.GET_BLOCK_CHAIN_INFO:
            let get_block_chain_info = await btcCoreOperations.get_block_chain_info();
            return get_block_chain_info;
    }

}

module.exports={PerformBtcCoreOperations}
