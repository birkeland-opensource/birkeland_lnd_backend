const {
  getWalletInfo,
  authenticatedLndGrpc,
  getChainBalance,
  getChannel,
  getChannelBalance,
  getChannels,
  getMethods,
  getNode,
  getNetworkInfo,
  getPeers,
  getWalletVersion,
  getPublicKey,
  openChannel,
  createChainAddress,
  getUtxos,
  addPeer,
  pay,
  getBackup,
  getBackups,
  getPendingChannels,
  createInvoice,
  getInvoices,
  getIdentity,
  cancelHodlInvoice,
  payViaPaymentDetails,
  getPayments,
  closeChannel,
  getClosedChannels,
  getInvoice
} = require("lightning");

const fs = require("fs");
const tls_cert = fs.readFileSync("/etc/birkeland/tlscert", {
  encoding: "utf8",
  flag: "r",
});

const base_sixtyfoir_macroon = fs.readFileSync("/etc/birkeland/btc_admin_macroon", {
  encoding: "utf8",
  flag: "r",
});

const { lnd } = authenticatedLndGrpc({
  cert: tls_cert,
  macaroon: base_sixtyfoir_macroon,
  socket: "127.0.0.1:10009",
 // socket: "10.2.209.103:10009",
});

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
  GET_PENDING_CHANNELS : "get_pending_channels", //19
  CREATE_INVOICE : "create_invoice", //20
  GET_INVOICES : "get_invoices", //21
  GET_IDENTITY : "get_identity", //22    
  CANCEL_HODL_INVOICE : "cancel_hodl_invoices", //23
  PAY_VIA_PAYMENT_DETAILS : "pay_via_payment_details", //24
  GET_PAYMENTS : "get_payments", //25
  CLOSE_A_CHANNEL :"close_a_channel", //26 
  GET_CLOSED_CHANNELS : "get_closed_channels", //27
  GET_INVOICE : "get_invoice", //21
};

const respond_to_request = (ops_res, res) =>{

  if(ops_res?.success){
    return res.status(200).send({ success: true, message: ops_res?.message });
  }
  else{
    return res.status(500).send({ success: false, message: ops_res?.message });
  }
}

exports.PerformAuthenticatedOperation = async (req, res) => {
  let { operation } = req.body;
  switch (operation) {
    case LND_GRPC_OPERATION.GET_U_TXOS:
      let get_u_txos_resp = await get_u_txos();
      respond_to_request(get_u_txos_resp,res);
      break;
    case LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS:
      let create_chain_address_resp = await create_chain_address();
      respond_to_request(create_chain_address_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
      let get_chain_balance_resp = await get_chain_balance();
      respond_to_request(get_chain_balance_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_CHANNEL:
      let get_channel_resp =  await get_channel(req.body);
      respond_to_request(get_channel_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_CHANNEL_BALANCE:
      let get_channel_balance_resp =  await get_channel_balance();
      respond_to_request(get_channel_balance_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_CHANNELS:
      let get_channels_resp =  await get_channels();
      respond_to_request(get_channels_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_METHODS:
      let get_methods_resp = await get_methods();
      respond_to_request(get_methods_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_NODE:
      let get_node_resp = await get_node(req.body);
      respond_to_request(get_node_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_NETWORK_INFO:
      let get_network_info_resp = await get_network_info();
      respond_to_request(get_network_info_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_PEERS:
       let get_peers_resp = await get_peers();
       respond_to_request(get_peers_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_WALLET_VERSION:
       let get_wallet_version_resp = await get_wallet_version();
       respond_to_request(get_wallet_version_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_WALLET_INFO:
      let get_wallet_info_resp =  await get_wallet_info();
      respond_to_request(get_wallet_info_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_PUBLIC_KEY:
      let get_public_key_resp = await get_public_key();
      respond_to_request(get_public_key_resp,res);
      break;
    case LND_GRPC_OPERATION.OPEN_CHANNEL:
      let open_channel_resp = await open_channel(req.body);
      respond_to_request(open_channel_resp,res);
      break;
    case LND_GRPC_OPERATION.ADD_PEER:
      let add_peer_resp = await add_peer(req.body);
      respond_to_request(add_peer_resp,res);
      break;
    case LND_GRPC_OPERATION.PAY:
      let make_payment_resp = await make_payment(req.body);
      respond_to_request(make_payment_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_BACKUP:
      let get_backup_resp = await get_backup();
      respond_to_request(get_backup_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_BACKUPS:
      let get_backups_resp = await get_backups();
      respond_to_request(get_backups_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_PENDING_CHANNELS:
      let get_pending_channels_resp = await get_pending_channels();
      respond_to_request(get_pending_channels_resp,res);
      break;
    case LND_GRPC_OPERATION.CREATE_INVOICE:
      let create_invoice_resp = await create_invoice(req.body);
      respond_to_request(create_invoice_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_INVOICES:
      let get_invoices_resp = await get_invoices();
      respond_to_request(get_invoices_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_IDENTITY:
      let get_identity_resp = await get_identity();
      respond_to_request(get_identity_resp,res);
      break;
    case LND_GRPC_OPERATION.CANCEL_HODL_INVOICE:
      let cancel_hodl_invoices_resp = await cancel_hodl_invoices(req.body);
      respond_to_request(cancel_hodl_invoices_resp,res);
      break;
    case LND_GRPC_OPERATION.PAY_VIA_PAYMENT_DETAILS:
      let pay_via_payment_details_resp = await pay_via_payment_details(req.body);
      respond_to_request(pay_via_payment_details_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_PAYMENTS:
      let get_payments_resp = await get_payments();
      respond_to_request(get_payments_resp,res);
      break;
    case LND_GRPC_OPERATION.CLOSE_A_CHANNEL:
      let close_a_channel_resp = close_a_channel(req.body);
      respond_to_request(close_a_channel_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_CLOSED_CHANNELS:
      let get_closed_channels_resp = await get_closed_channels();
      respond_to_request(get_closed_channels_resp,res);
      break;
    case LND_GRPC_OPERATION.GET_INVOICE:
      let get_invoice_resp = await get_invoice(req.body);
      respond_to_request(get_invoice_resp,res);
      break;

      
    default:
      return res
        .status(500)
        .send({ success: false, message: "Invalid operation" });
  }
};


const get_closed_channels = async() =>{
  try{
    console.log("get_closed_channels");
    const resp = await getClosedChannels({lnd });
    return { success: true, message: resp };
  }
  catch(err){
    return { success: false, message: err };
  }
}

const close_a_channel = async(body) =>{
  try {
    console.log("close_a_channel")
    let {channel_id} = body;
    let id = channel_id;
    console.log({lnd,id })
    const resp = await closeChannel({lnd,id });
    return { success: true, message: resp };
  } catch (err) {
    console.log(err)
    return { success: false, message: err };
  }
}

const pay_via_payment_details = async(body) =>{
  try {
    console.log("pay_via_payment_details")
    let {request_id,destination,token} = body;
    let request_id_object = {id:request_id};
    console.log({request_id_object,destination,token });
    const resp = await payViaPaymentDetails({request_id_object,destination,token, lnd });
    return { success: true, message: resp };
  } catch (err) {
    console.log(err)
    return { success: false, message: err };
  }
};


const cancel_hodl_invoices = async(body) =>{
  try {
    console.log("cancel_hodl_invoices")
    let {request_id} = body;
    let request_id_object = {id:request_id}
    const resp = await cancelHodlInvoice({request_id_object, lnd });
    return { success: true, message: resp };
  } catch (err) {
    console.log(err)
    return { success: false, message: err };
  }
};

const get_identity = async() =>{
  try {
    const resp = await getIdentity({ lnd });
    return { success: true, message: resp };
  } catch (err) {
    return  {success: false, message: err };
  }
};

const get_payments = async() =>{
  try {
    const resp = await getPayments({ lnd });
    console.log(resp)
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
}


const get_backups = async () => {
  try {
    const resp = await getBackups({ lnd });

    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

const get_backup = async () => {
  try {
    const [channel] = (await getChannels({ lnd })).channels;
    const resp = await getBackup({
      lnd,
      transaction_id: channel.transaction_id,
      transaction_vout: channel.transaction_vout,
    });

    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

const make_payment = async (body) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    //  request :request
    // },
    console.log("make_payment");
    let { request } = body;
    console.log(request)
    let resp = await pay({ lnd: lnd, request: request });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    console.log(err)
    return { success: false, message: err };
  }
};

const add_peer = async (body) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    // },
    console.log("add_peer");
    let { socket, public_key } = body;
    console.log(body)
    let resp = await addPeer({
      lnd: lnd,
      public_key: public_key,
      socket: socket,
    });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    console.log(err)
    return { success: false, message: err };
  }
};

const get_u_txos = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    // }
    console.log("get_u_txos");
    let resp = await getUtxos({ lnd: lnd });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

const create_chain_address = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    //      format:'p2wpkh'
    // }
    console.log("create_chain_address");
    let resp = await createChainAddress({ lnd: lnd, format: "p2wpkh" });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

const open_channel = async (body) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    let { local_tokens, partner_public_key } = body;
    console.log("open_channel");
    let resp = await openChannel({
      local_tokens: local_tokens,
      partner_public_key: partner_public_key,
      lnd: lnd,
    });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//1
const get_chain_balance = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_chain_balance");
    let resp = await getChainBalance({ lnd: lnd });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//2
const get_channel = async (body) => {
  try {
    // {
    //     id: <Standard Format Channel Id String>
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_channel");
    let { channel_id } = body;
    let resp = await getChannel({ id: channel_id, lnd: lnd });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//3
const get_channel_balance = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_channel_balance");
    let resp = await getChannelBalance({ lnd: lnd });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};
//4
const get_channels = async () => {
  try {
    // {
    //     [is_active]: <Limit Results To Only Active Channels Bool> // false
    //     [is_offline]: <Limit Results To Only Offline Channels Bool> // false
    //     [is_private]: <Limit Results To Only Private Channels Bool> // false
    //     [is_public]: <Limit Results To Only Public Channels Bool> // false
    //     lnd: <Authenticated LND gRPC API Object>
    //     [partner_public_key]: <Only Channels With Public Key Hex String>
    //  }
    console.log("get_channels");
    let resp = await getChannels({lnd: lnd });
    return { success: true, message: resp };

  } catch (err) {
    return { success: false, message: err };
  }
};

//5
const get_methods = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_methods");
    let resp = await getMethods({ lnd: lnd });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//6
const get_node = async (body) => {
  try {
    // {
    //     [is_omitting_channels]: <Omit Channels from Node Bool>
    //     lnd: <Authenticated LND API Object>
    //     public_key: <Node Public Key Hex String>
    // }
    let { public_key } = body;
    console.log("get_node");
    let resp = await getNode({ lnd: lnd, public_key: public_key });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//7
const get_network_info = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_network_info");
    let resp = await getNetworkInfo({ lnd: lnd });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//8
const get_peers = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_peers");
    let resp = await getPeers({ lnd: lnd });
    console.log(resp)
    return { success: true, message: resp };
  } catch (err) {
    console.log(err)
    return { success: false, message: err };
  }
};

//9
const get_wallet_version = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_wallet_version");
    let resp = await getWalletVersion({ lnd: lnd });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//10
const get_wallet_info = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_wallet_info");
    let resp = await getWalletInfo({ lnd: lnd });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//10
const get_pending_channels = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_pending_channels");
    let resp = await getPendingChannels({ lnd: lnd });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

//11
const get_public_key = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_public_key");
    let resp = await getPublicKey({ family: 1, index: 1, lnd: lnd });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

const create_invoice = async(body) =>{
  try {
    // {
    //     [is_omitting_channels]: <Omit Channels from Node Bool>
    //     lnd: <Authenticated LND API Object>
    //     tokens: <Tokens Number>
    // }
    let { mtokens } = body;
    console.log("create_invoice");
    console.log(mtokens)
    let resp = await createInvoice({ lnd: lnd, mtokens: mtokens });
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
}


const get_invoices = async () => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    // }
    console.log("get_invoices");
    let resp = await getInvoices({ lnd: lnd });
    console.log(resp);
    return { success: true, message: resp };
  } catch (err) {
    return { success: false, message: err };
  }
};

const get_invoice = async (body) => {
  try {
  let {invoice_id} = body;
  let id = invoice_id;
  console.log("get_invoice");
  let resp = await getInvoice({id, lnd: lnd });
  console.log(resp);
  return { success: true, message: resp }
  ;
  }
  catch(err){
    return { success: false, message: err };
  }

}


