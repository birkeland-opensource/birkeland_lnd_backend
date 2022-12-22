const { getWalletInfo, authenticatedLndGrpc, getChainBalance, getChannel, getChannelBalance, getChannels, getMethods, getNode, getNetworkInfo, getPeers, getWalletStatus, getWalletVersion } = require("lightning")

const tls_cert = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNaRENDQWdxZ0F3SUJBZ0lRY0ZVbTlTWGR1ZTBZYUs2TVpXakhmakFLQmdncWhrak9QUVFEQWpCRk1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1TSXdJQVlEVlFRREV4bDFjMlZ5TFZSeQpZWFpsYkUxaGRHVXRVRFEwT1MxSE15MU5NQjRYRFRJeU1USXhPREV5TXpVd01Wb1hEVEkwTURJeE1qRXlNelV3Ck1Wb3dSVEVmTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERWlNQ0FHQTFVRUF4TVoKZFhObGNpMVVjbUYyWld4TllYUmxMVkEwTkRrdFJ6TXRUVEJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSApBMElBQkVyVkx0VjhRejhsWDFTS0NCQ0dITFVKU1RrNUY3NTRaL29iemhvZVlXbS9jTFlHTzJXZFZWRGZEczl1CllBTGsrcGpVd3hGNzBjeUZ0akNTRXpHT1g5bWpnZHN3Z2Rnd0RnWURWUjBQQVFIL0JBUURBZ0trTUJNR0ExVWQKSlFRTU1Bb0dDQ3NHQVFVRkJ3TUJNQThHQTFVZEV3RUIvd1FGTUFNQkFmOHdIUVlEVlIwT0JCWUVGTWRVY01HeAo1aWZWU0hWNGdOVVIwZ2FmUU1NS01JR0FCZ05WSFJFRWVUQjNnaGwxYzJWeUxWUnlZWFpsYkUxaGRHVXRVRFEwCk9TMUhNeTFOZ2dsc2IyTmhiR2h2YzNTQ0JIVnVhWGlDQ25WdWFYaHdZV05yWlhTQ0IySjFabU52Ym02SEJIOEEKQUFHSEVBQUFBQUFBQUFBQUFBQUFBQUFBQUFHSEJBb0MwV2VIRVA2QUFBQUFBQUFBWHllTURZVmRyeENIQkFBQQpBQUF3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQUk5MWQ5SUxicE1xd0hja0pQMnV2c1BjZ3lJSjhBRUZ2dytJClRmRllhTWI0QWlBd1ZIekVZS3ZlVEZ3eDhzT0p3UmFMRnE1MW5nMlN2cWx6cnhtYVpFQWxRQT09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K';
const base_sixtyfoir_macroon = 'AgEDbG5kAvgBAwoQWHJoclgj0Kn3rODEcS2ZjRIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYg7K6k/guxNh1tu58D0ZSne5DdQJG5Nmpif6m+H8mlmjk=user';
const {lnd} = authenticatedLndGrpc({
    cert : tls_cert,
    macaroon : base_sixtyfoir_macroon,
    socket : '127.0.0.1:10009'

})

const LND_GRPC_OPERATION = {
    GET_CHAIN_BALANCE : "get_chain_balance", //1
    GET_CHANNEL: "get_channel", //2
    GET_CHANNEL_BALANCE : "get_channel_balance", //3
    GET_CHANNELS: "get_channels", //4
    GET_METHODS : "get_methods", //5
    GET_NODE : "get_node", //6
    GET_NETWORK_INFO : "get_network_info", //7
    GET_PEERS : "get_peers", //8
    GET_WALLET_STATUS : "get_wallet_status", //9
    GET_WALLET_VERSION : "get_wallet_version", //10
    GET_WALLET_INFO :"get_wallet_info" //11
}
exports.PerformAuthenticatedOperation =async (req,res) =>{
    let {operation} = req.body;
    var resp = "";
    switch(operation){
        case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
            resp = await get_chain_balance(req);
            break;
        case LND_GRPC_OPERATION.GET_CHANNEL:
            resp = await get_channel(req.body);
            break;
        case LND_GRPC_OPERATION.GET_CHANNEL_BALANCE:
            resp = await get_channel_balance(req.body);
            break;
        case LND_GRPC_OPERATION.GET_CHANNELS:
            resp = await get_channels(req.body);
            break;
        case LND_GRPC_OPERATION.GET_METHODS:
            resp = await get_methods(req.body);
            break;
        case LND_GRPC_OPERATION.GET_NODE:
            resp = await get_node(req.body);
            break;
        case LND_GRPC_OPERATION.GET_NETWORK_INFO:
            resp = await get_network_info(req.body);
            break;
        case LND_GRPC_OPERATION.GET_PEERS:
            resp = await get_peers(req.body);
            break;
        case LND_GRPC_OPERATION.GET_WALLET_STATUS:
            resp = await get_wallet_status(req.body);
            break;
        case LND_GRPC_OPERATION.GET_WALLET_VERSION:
            resp = await get_wallet_version(req.body);
            break;
        case LND_GRPC_OPERATION.GET_WALLET_INFO:
            resp = await get_wallet_info(req);
            break;
        default:
            return res.status(500).send({success : false,message :"Invalid operation"});
    }
    return res.status(200).send({success : true,message:resp});
}


//1
const get_chain_balance = async (req) =>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_chain_balance");
        let resp = await getChainBalance({lnd:lnd});
        console.log(resp);
        return resp;
    }
    catch(err){
        return err;
    }
}

//2
const get_channel = async (req) =>{
    try{
        // {
        //     id: <Standard Format Channel Id String>
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_channel");
        let {channel_id} = req.body;
        let resp = await getChannel({id :channel_id, lnd:lnd});
        console.log(resp);
        return resp;
    }
    catch(err){
        return err
    }
}

//3
const get_channel_balance = async(req)=>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_channel_balance");
        let resp = await getChannelBalance({lnd:lnd});
        return resp;
    }
    catch(err){
        return err;
    }
}
//4
const get_channels = async (req) =>{
    try{

        // {
        //     [is_active]: <Limit Results To Only Active Channels Bool> // false
        //     [is_offline]: <Limit Results To Only Offline Channels Bool> // false
        //     [is_private]: <Limit Results To Only Private Channels Bool> // false
        //     [is_public]: <Limit Results To Only Public Channels Bool> // false
        //     lnd: <Authenticated LND gRPC API Object>
        //     [partner_public_key]: <Only Channels With Public Key Hex String>
        //  }
        console.log("get_channel");
        let {channel_id} = req.body;
        let resp = await getChannels({id :channel_id, lnd:lnd});
        console.log(resp);
        return resp;
    }
    catch(err){
        return err
    }
}

//5
const get_methods = async (req) =>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_channel");
        let {channel_id} = req.body;
        let resp = await getMethods({id :channel_id, lnd:lnd});
        console.log(resp);
        return resp;
    }
    catch(err){
        return err
    }
}

//6
const get_node = async(req)=>{

    try{
        // {
        //     [is_omitting_channels]: <Omit Channels from Node Bool>
        //     lnd: <Authenticated LND API Object>
        //     public_key: <Node Public Key Hex String>
        // }
        let {public_key} = req.body;
        console.log("get_wallet_info");
        let resp = await getNode({lnd:lnd, public_key:public_key});
        return resp;
    }
    catch(err){
        return err;
    }
}

//7
const get_network_info = async(req)=>{

    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_wallet_info");
        let resp = await getNetworkInfo({lnd:lnd});
        return resp;
    }
    catch(err){
        return err;
    }
}

//8
const get_peers = async(req)=>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_peers");
        let resp = await getPeers({lnd:lnd});
        return resp;
    }
    catch(err){
        return err;
    }
}

//9
const get_wallet_status = async(req)=>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_wallet_status");
        let resp = await getWalletStatus({lnd:lnd});
        return resp;
    }
    catch(err){
        return err;
    }
}

//10
const get_wallet_version = async(req)=>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_wallet_version");
        let resp = await getWalletVersion({lnd:lnd});
        return resp;
    }
    catch(err){
        return err;
    }
}

//11
const get_wallet_info = async(req)=>{
    try{
        // {
        //     lnd: <Authenticated LND API Object>
        // }
        console.log("get_wallet_info");
        let resp = await getWalletInfo({lnd:lnd});
        return resp;
    }
    catch(err){
        return err;
    }
}

