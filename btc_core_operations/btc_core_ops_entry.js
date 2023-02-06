
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
        
        case BTC_CORE_OPERATIONS.LOAD_WALLET:
            let load_wallet = await btcCoreOperations.load_wallet(params);
            return load_wallet;
        
        case BTC_CORE_OPERATIONS.GET_WALLET_INFO:
            let get_wallet_info = await btcCoreOperations.get_wallet_info();
            return get_wallet_info;

        case BTC_CORE_OPERATIONS.LIST_ALL_WALLETS:
            let list_wallets = await btcCoreOperations.list_wallets();
            return list_wallets;
    }

}

module.exports={PerformBtcCoreOperations}
