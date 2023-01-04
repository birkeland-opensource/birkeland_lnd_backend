const { unauthenticatedLndGrpc, getWalletStatus, unlockWallet } = require("lightning")
const fs = require("fs")

const tls_cert = fs.readFileSync('/etc/birkeland/tlscert',{encoding:'utf8', flag:'r'});


const {lnd} = unauthenticatedLndGrpc({
    cert : tls_cert,
    socket : '127.0.0.1:10009'

})

const LND_GRPC_OPERATION = {
    GET_WALLET_STATUS : "get_wallet_status", //9
    UNLOCK_WALLET : "un_lock_wallet"
}
exports.PerformUnAuthenticatedOperation =async (req,res) =>{
    let {operation} = req.body;
    var resp = "";
    switch(operation){   
        case LND_GRPC_OPERATION.GET_WALLET_STATUS: //1
            await get_wallet_status(res); 
            break;
        case LND_GRPC_OPERATION.UNLOCK_WALLET: //2
            await unlock_wallet(req.body,res);
            break;
        default:
            return res.status(500).send({success : false,message :"Invalid operation"});
    }
    
}


//1
const get_wallet_status = async(res)=>{
    try{
        // {
        //     lnd: <Unauthenticated LND API Object>
        // }
        console.log("get_wallet_status");
        let resp = await getWalletStatus({lnd:lnd});
        return res.status(200).send({success : true,message:resp});
    }
    catch(err){
        return res.status(500).send({success : false,message :JSON.stringify(err)});
        
    }
}

//2
const unlock_wallet = async(body,res)=>{
    try{
        // {
        //     lnd: <Unauthenticated LND gRPC API Object>
        //     password: <Wallet Password String>
        // }
        console.log("unlock_wallet");
        let {password} = body;
        let resp = await unlockWallet({lnd:lnd, password :password});
        return res.status(200).send({success : true,message:resp});
    }
    catch(err){
        return res.status(500).send({success : false,message :JSON.stringify(err)});
    }
}
