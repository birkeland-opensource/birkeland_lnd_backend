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
  getClosedChannels
} = require("lightning");

const fs = require("fs");
const tls_cert = fs.readFileSync("/home/user/temp", {
  encoding: "utf8",
  flag: "r",
});

const base_sixtyfoir_macroon = fs.readFileSync("/home/user/macaroon", {
  encoding: "utf8",
  flag: "r",
});

const { lnd } = authenticatedLndGrpc({
  cert: tls_cert,
  macaroon: base_sixtyfoir_macroon,
  socket: "127.0.0.1:10009",
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
};
exports.PerformAuthenticatedOperation = async (req, res) => {
  let { operation } = req.body;
  switch (operation) {
    case LND_GRPC_OPERATION.GET_U_TXOS:
      await get_u_txos(res);
      break;
    case LND_GRPC_OPERATION.CREATE_CHAIN_ADDRESS:
      await create_chain_address(res);
      break;
    case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
      await get_chain_balance(res);
      break;
    case LND_GRPC_OPERATION.GET_CHANNEL:
      await get_channel(req.body, res);
      break;
    case LND_GRPC_OPERATION.GET_CHANNEL_BALANCE:
      await get_channel_balance(res);
      break;
    case LND_GRPC_OPERATION.GET_CHANNELS:
      await get_channels(req.body, res);
      break;
    case LND_GRPC_OPERATION.GET_METHODS:
      await get_methods( res);
      break;
    case LND_GRPC_OPERATION.GET_NODE:
      await get_node(req.body, res);
      break;
    case LND_GRPC_OPERATION.GET_NETWORK_INFO:
      await get_network_info(req.body, res);
      break;
    case LND_GRPC_OPERATION.GET_PEERS:
       await get_peers(res);
      break;
    case LND_GRPC_OPERATION.GET_WALLET_VERSION:
       await get_wallet_version(res);
      break;
    case LND_GRPC_OPERATION.GET_WALLET_INFO:
      await get_wallet_info(res);
      break;
    case LND_GRPC_OPERATION.GET_PUBLIC_KEY:
      await get_public_key(res);
      break;
    case LND_GRPC_OPERATION.OPEN_CHANNEL:
      await open_channel(req.body, res);
      break;
    case LND_GRPC_OPERATION.ADD_PEER:
      await add_peer(req.body, res);
      break;
    case LND_GRPC_OPERATION.PAY:
      await make_payment(req.body, res);
      break;
    case LND_GRPC_OPERATION.GET_BACKUP:
      await get_backup(res);
      break;
    case LND_GRPC_OPERATION.GET_BACKUPS:
      await get_backups(res);
      break;
    case LND_GRPC_OPERATION.GET_PENDING_CHANNELS:
      await get_pending_channels(res);
      break;
    case LND_GRPC_OPERATION.CREATE_INVOICE:
      await create_invoice(req.body,res);
      break;
    case LND_GRPC_OPERATION.GET_INVOICES:
      await get_invoices(res);
      break;
    case LND_GRPC_OPERATION.GET_IDENTITY:
      await get_identity(res);
      break;
    case LND_GRPC_OPERATION.CANCEL_HODL_INVOICE:
      await cancel_hodl_invoices(req.body,res);
      break;
    case LND_GRPC_OPERATION.PAY_VIA_PAYMENT_DETAILS:
      await pay_via_payment_details(req.body,res);
      break;
    case LND_GRPC_OPERATION.GET_PAYMENTS:
      await get_payments(res);
      break;
    case LND_GRPC_OPERATION.CLOSE_A_CHANNEL:
      await close_a_channel(req.body,res);
      break;
    case LND_GRPC_OPERATION.GET_CLOSED_CHANNELS:
      await get_closed_channels(res);
      break;

    default:
      return res
        .status(500)
        .send({ success: false, message: "Invalid operation" });
  }
};


const get_closed_channels = async(res) =>{
  try{
    console.log("get_closed_channels");
    const resp = await getClosedChannels({lnd });
    return res.status(200).send({ success: true, message: resp });
  }
  catch(err){
    return res.status(500).send({ success: false, message: err });
  }
}

const close_a_channel = async(body,res) =>{
  try {
    console.log("close_a_channel")
    let {channel_id} = body;
    let id = channel_id;
    console.log({lnd,id })
    const resp = await closeChannel({lnd,id });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, message: err });
  }
}

const pay_via_payment_details = async(body,res) =>{
  try {
    console.log("pay_via_payment_details")
    let {request_id,destination,token} = body;
    let request_id_object = {id:request_id};
    console.log({request_id_object,destination,token });
    const resp = await payViaPaymentDetails({request_id_object,destination,token, lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, message: err });
  }
};


const cancel_hodl_invoices = async(body,res) =>{
  try {
    console.log("cancel_hodl_invoices")
    let {request_id} = body;
    let request_id_object = {id:request_id}
    const resp = await cancelHodlInvoice({request_id_object, lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, message: err });
  }
};

const get_identity = async(res) =>{
  try {
    const resp = await getIdentity({ lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

const get_payments = async(res) =>{
  try {
    const resp = await getPayments({ lnd });
    console.log(resp)
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
}


const get_backups = async (res) => {
  try {
    const resp = await getBackups({ lnd });

    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

const get_backup = async (res) => {
  try {
    const [channel] = (await getChannels({ lnd })).channels;
    const resp = await getBackup({
      lnd,
      transaction_id: channel.transaction_id,
      transaction_vout: channel.transaction_vout,
    });

    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

const make_payment = async (body, res) => {
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
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, message: err });
  }
};

const add_peer = async (body, res) => {
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
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, message: err });
  }
};

const get_u_txos = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    // }
    console.log("get_u_txos");
    let resp = await getUtxos({ lnd: lnd });
    console.log(resp);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

const create_chain_address = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    //      format:'p2wpkh'
    // }
    console.log("create_chain_address");
    let resp = await createChainAddress({ lnd: lnd, format: "p2wpkh" });
    console.log(resp);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

const open_channel = async (body, res) => {
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
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//1
const get_chain_balance = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_chain_balance");
    let resp = await getChainBalance({ lnd: lnd });
    console.log(resp);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//2
const get_channel = async (body, res) => {
  try {
    // {
    //     id: <Standard Format Channel Id String>
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_channel");
    let { channel_id } = body;
    let resp = await getChannel({ id: channel_id, lnd: lnd });
    console.log(resp);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//3
const get_channel_balance = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_channel_balance");
    let resp = await getChannelBalance({ lnd: lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};
//4
const get_channels = async (req, res) => {
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
    return res.status(200).send({ success: true, message: resp });

  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//5
const get_methods = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_methods");
    let resp = await getMethods({ lnd: lnd });
    console.log(resp);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//6
const get_node = async (body, res) => {
  try {
    // {
    //     [is_omitting_channels]: <Omit Channels from Node Bool>
    //     lnd: <Authenticated LND API Object>
    //     public_key: <Node Public Key Hex String>
    // }
    let { public_key } = body;
    console.log("get_node");
    let resp = await getNode({ lnd: lnd, public_key: public_key });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//7
const get_network_info = async (req, res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_network_info");
    let resp = await getNetworkInfo({ lnd: lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//8
const get_peers = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_peers");
    let resp = await getPeers({ lnd: lnd });
    console.log(resp)
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false, message: err });
  }
};

//9
const get_wallet_version = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_wallet_version");
    let resp = await getWalletVersion({ lnd: lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//10
const get_wallet_info = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_wallet_info");
    let resp = await getWalletInfo({ lnd: lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//10
const get_pending_channels = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_pending_channels");
    let resp = await getPendingChannels({ lnd: lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

//11
const get_public_key = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>
    // }
    console.log("get_public_key");
    let resp = await getPublicKey({ family: 1, index: 1, lnd: lnd });
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};

const create_invoice = async(body,res) =>{
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
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
}


const get_invoices = async (res) => {
  try {
    // {
    //     lnd: <Authenticated LND API Object>,
    // }
    console.log("get_invoices");
    let resp = await getInvoices({ lnd: lnd });
    console.log(resp);
    return res.status(200).send({ success: true, message: resp });
  } catch (err) {
    return res.status(500).send({ success: false, message: err });
  }
};