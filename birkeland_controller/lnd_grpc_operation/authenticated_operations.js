const { getWalletInfo, authenticatedLndGrpc, getChainBalance } = require("lightning")

const tls_cert = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNaRENDQWdxZ0F3SUJBZ0lRY0ZVbTlTWGR1ZTBZYUs2TVpXakhmakFLQmdncWhrak9QUVFEQWpCRk1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1TSXdJQVlEVlFRREV4bDFjMlZ5TFZSeQpZWFpsYkUxaGRHVXRVRFEwT1MxSE15MU5NQjRYRFRJeU1USXhPREV5TXpVd01Wb1hEVEkwTURJeE1qRXlNelV3Ck1Wb3dSVEVmTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERWlNQ0FHQTFVRUF4TVoKZFhObGNpMVVjbUYyWld4TllYUmxMVkEwTkRrdFJ6TXRUVEJaTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSApBMElBQkVyVkx0VjhRejhsWDFTS0NCQ0dITFVKU1RrNUY3NTRaL29iemhvZVlXbS9jTFlHTzJXZFZWRGZEczl1CllBTGsrcGpVd3hGNzBjeUZ0akNTRXpHT1g5bWpnZHN3Z2Rnd0RnWURWUjBQQVFIL0JBUURBZ0trTUJNR0ExVWQKSlFRTU1Bb0dDQ3NHQVFVRkJ3TUJNQThHQTFVZEV3RUIvd1FGTUFNQkFmOHdIUVlEVlIwT0JCWUVGTWRVY01HeAo1aWZWU0hWNGdOVVIwZ2FmUU1NS01JR0FCZ05WSFJFRWVUQjNnaGwxYzJWeUxWUnlZWFpsYkUxaGRHVXRVRFEwCk9TMUhNeTFOZ2dsc2IyTmhiR2h2YzNTQ0JIVnVhWGlDQ25WdWFYaHdZV05yWlhTQ0IySjFabU52Ym02SEJIOEEKQUFHSEVBQUFBQUFBQUFBQUFBQUFBQUFBQUFHSEJBb0MwV2VIRVA2QUFBQUFBQUFBWHllTURZVmRyeENIQkFBQQpBQUF3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQUk5MWQ5SUxicE1xd0hja0pQMnV2c1BjZ3lJSjhBRUZ2dytJClRmRllhTWI0QWlBd1ZIekVZS3ZlVEZ3eDhzT0p3UmFMRnE1MW5nMlN2cWx6cnhtYVpFQWxRQT09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K';
const base_sixtyfoir_macroon = 'AgEDbG5kAvgBAwoQWHJoclgj0Kn3rODEcS2ZjRIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYg7K6k/guxNh1tu58D0ZSne5DdQJG5Nmpif6m+H8mlmjk=user';
const {lnd} = authenticatedLndGrpc({
    cert : tls_cert,
    macaroon : base_sixtyfoir_macroon,
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