const { unauthenticatedLndGrpc, getWalletStatus, unlockWallet } = require("lightning")
const fs = require("fs")
//const tls_cert = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNaRENDQWdxZ0F3SUJBZ0lRY0ZVbTlTWGR1ZTBZYUs2TVpXakhmakFLQmdncWhrak9QUVFEQWpCRk1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1TSXdJQVlEVlFRREV4bDFjMlZ5TFZSeQpZWFpsYkUxaGRHVXRVRFEwT1MxSE15MU5NQjRYRFRJeU1USXhPREV5TXpVd01Wb1hEVEkwTURJeE1qRXlNelV3Ck1Wb3dSVEVmTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERWlNQ0FHQTFVRUF4TVoKZFhObGNpMVVjbUYyWld4TllYUmxMVkEwTkRrdFJ6TXRUVEJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSApBMElBQkVyVkx0VjhRejhsWDFTS0NCQ0dITFVKU1RrNUY3NTRaL29iemhvZVlXbS9jTFlHTzJXZFZWRGZEczl1CllBTGsrcGpVd3hGNzBjeUZ0akNTRXpHT1g5bWpnZHN3Z2Rnd0RnWURWUjBQQVFIL0JBUURBZ0trTUJNR0ExVWQKSlFRTU1Bb0dDQ3NHQVFVRkJ3TUJNQThHQTFVZEV3RUIvd1FGTUFNQkFmOHdIUVlEVlIwT0JCWUVGTWRVY01HeAo1aWZWU0hWNGdOVVIwZ2FmUU1NS01JR0FCZ05WSFJFRWVUQjNnaGwxYzJWeUxWUnlZWFpsYkUxaGRHVXRVRFEwCk9TMUhNeTFOZ2dsc2IyTmhiR2h2YzNTQ0JIVnVhWGlDQ25WdWFYaHdZV05yWlhTQ0IySjFabU52Ym02SEJIOEEKQUFHSEVBQUFBQUFBQUFBQUFBQUFBQUFBQUFHSEJBb0MwV2VIRVA2QUFBQUFBQUFBWHllTURZVmRyeENIQkFBQQpBQUF3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQUk5MWQ5SUxicE1xd0hja0pQMnV2c1BjZ3lJSjhBRUZ2dytJClRmRllhTWI0QWlBd1ZIekVZS3ZlVEZ3eDhzT0p3UmFMRnE1MW5nMlN2cWx6cnhtYVpFQWxRQT09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K';
const tls_cert = fs.readFileSync('/home/user/temp',{encoding:'utf8', flag:'r'});


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
