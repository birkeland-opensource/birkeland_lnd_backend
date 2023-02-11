

const LND_GRPC_OPERATION = {
    GET_CHAIN_BALANCE: "get_chain_balance", //1
    GET_CHANNEL: "get_channel", //2
    GET_CHANNEL_BALANCE: "get_channel_balance", //3
    GET_CHANNELS: "get_channels", //4
    GET_METHODS: "get_methods", //5
    GET_NODE: "get_node", //6
    GET_NETWORK_INFO: "get_network_info", //7
    GET_PEERS: "get_peers", //8
    GET_WALLET_VERSION: "get_wallet_version", //9
    GET_WALLET_INFO: "get_wallet_info", //10
    GET_PUBLIC_KEY: "get_public_key", //11
    OPEN_CHANNEL: "open_channel", //12
    GET_U_TXOS: "get_u_txos", //13
    CREATE_CHAIN_ADDRESS: "create_chain_address", //14
    ADD_PEER: "add_peer", //15
    PAY: "pay", //16
    GET_BACKUP: "get_backup", //17
    GET_BACKUPS: "get_backups", //18
    GET_PENDING_CHANNELS: "get_pending_channels", //19
    CREATE_INVOICE: "create_invoice", //20
    GET_INVOICES: "get_invoices", //21
    GET_IDENTITY: "get_identity", //22
    CANCEL_HODL_INVOICE: "cancel_hodl_invoices", //23
    PAY_VIA_PAYMENT_DETAILS: "pay_via_payment_details", //24
    GET_PAYMENTS: "get_payments", //25
    CLOSE_A_CHANNEL: "close_a_channel", //26
    GET_CLOSED_CHANNELS: "get_closed_channels", //27
    GET_INVOICE: "get_invoice", //28
  };

  const BTC_CORE_OPERATIONS = {
    CREATE_BTC_WALLET : "create_btc_wallet",
    GET_BLOCK_CHAIN_INFO : "get_block_chain_info",
    GET_WALLET_INFO : "get_wallet_info",
    LIST_WALLET_DIR : "list_wallet_dir",
    LIST_ALL_WALLETS : "list_all_wallets",
    LOAD_WALLET : "load_wallet",
    LIST_RECEIVED_BY_ADDRESS : "list_received_by_address",
    GET_RAW_TRANSACTION : "get_raw_transaction",
    GET_RECEIVED_BY_ADDRESS : "get_received_by_address",
    GET_TRANSACTION : "get_transaction"

  }

const BIRKELAND_WALLET_TRANSACTION_STATUS = {
    "CREATED" : "CREATED",
    "PENDING" : "PENDING",
    "SUCCESS" : "SUCCESS",
    "FAILED" : "FAILED"
}

const BIRKELAND_WALLET_TRANSACTION_INTENT = {
  "SEND" : "SEND",
  "RECEIVE" : "RECEIVE",
  "DEPOSIT" : "DEPOSIT",
  "WITHDRAW" : "WITHDRAW"
}

module.exports = {BTC_CORE_OPERATIONS,LND_GRPC_OPERATION,BIRKELAND_WALLET_TRANSACTION_STATUS,BIRKELAND_WALLET_TRANSACTION_INTENT}