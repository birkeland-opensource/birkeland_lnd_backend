const { getWalletInfo, authenticatedLndGrpc } = require("lightning")

const tls_cert = '';
const base_sixtyfoir_macroon = '';
const {lnd} = authenticatedLndGrpc({
    cert : tls_cert,
    macroon : base_sixtyfoir_macroon,
    socket : '127.0.0.1:10009'

})

const LND_GRPC_OPERATION = {
    GET_WALLET_INFO :"get_wallet_info",
    GET_CHAIN_BALANCE : "get_chain_balance"
}

exports.PerformAuthenticatedOperation =async (req,res) =>{
    let {operation} = req.body;
    console.log(operation)
    switch(operation){
        case LND_GRPC_OPERATION.GET_CHAIN_BALANCE:
            get_chain_balance(req,res);
            break;
        case LND_GRPC_OPERATION.GET_WALLET_INFO:
            get_wallet_info(req,res);
            break;
        default:
            return res.status(500).send({success : false,message :"Invalid operation"});
    }
}

const get_wallet_info = async(req,res)=>{

    try{
        console.log("get_wallet_info");
        let resp = await getWalletInfo({lnd:lnd});
        console.log(resp);
        return res.status(200).send({success : true,message:resp});
    }
    catch(err){
        console.log("error occured in get_wallet_info");
        console.log(err);
        return res.status(500).send({success : false,message :err});
    }
}

const get_chain_balance = async (req,res) =>{
    try{
        console.log("get_chain_balance");
        let resp = await getChainBalance({lnd:lnd});
        console.log(resp);
        return res.status(200).send({success : true, message :resp});
    }
    catch(err){
        console.log("error occured in get_chain_balance");
        console.log(err);
        return res.status(500).send({success : false, message : err});
    }
}