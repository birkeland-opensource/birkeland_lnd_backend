
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
            
        case BTC_CORE_OPERATIONS.LIST_WALLET_DIR:
            let list_wallet_dir = await btcCoreOperations.list_wallet_dir();
            return list_wallet_dir;
        case BTC_CORE_OPERATIONS.LIST_RECEIVED_BY_ADDRESS:
            let received_by_address = await btcCoreOperations.received_by_address(params);
            return received_by_address;
        case BTC_CORE_OPERATIONS.GET_RAW_TRANSACTION:
            let raw_transaction = await btcCoreOperations.get_raw_transaction(params);
            return raw_transaction;
        case BTC_CORE_OPERATIONS.GET_RECEIVED_BY_ADDRESS:
            let get_received_by_address = await btcCoreOperations.get_received_by_address(params);
            return get_received_by_address;
        case BTC_CORE_OPERATIONS.GET_TRANSACTION:
            let get_transaction = await btcCoreOperations.get_transaction(params);
            return get_transaction;


            
        

            

            
    }

}

module.exports={PerformBtcCoreOperations}
